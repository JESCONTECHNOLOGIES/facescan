import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  Vibration,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Global} from 'facescan/src/Global';
import HOCIcons from 'facescan/src/HOCIcons';
import {normalize} from 'facescan/src/componentStyle';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';
import {notifyMessage} from 'facescan/src/ComponentFunctions';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Constants
const IMAGE_URL = `http://api.amalaplus.org:9090/file/filedownload/photo/`;
const FACE_RECOGNITION_API = `http://api.amalaplus.org:9090/python/recognize`;
const COUNTDOWN_DURATION = 60; // seconds
const LOCATION_DISTANCE_THRESHOLD = 100; // meters
const VIBRATION_DURATION = 500; // ms

// Error messages
const ERROR_MESSAGES = {
  FACE_NOT_RECOGNIZED: '❌ Face not recognized. Please try again.',
  SERVER_ERROR: '❌ Could not connect to face recognition server.',
  LOCATION_ERROR: '⚠️ Location services are required for verification.',
  TIME_UP: '⏰ Time is up!',
  QR_INVALID: '❌ Invalid QR code. Please try again.',
  QR_LOCATION_MISMATCH: '❌ QR scanned, but location mismatch!',
  PERMISSION_DENIED: '❌ Camera permission is required to continue.',
};

const FaceScan = ({hrenemp, status}) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: false,
    isMsgShow: false,
    msg: '',
    msgType: 'info',
    currentStep: 'Start',
    countdown: COUNTDOWN_DURATION,
    location: null,
    employeeData: null,
    modalVisible: false,
    hasCameraPermission: false,
  });
  
  const timerRef = useRef(null);
  const isMountedRef = useRef(true);
  const processStartedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearTimer();
    };
  }, []);

  // Initialize when hrenemp is received
  useEffect(() => {
    if (hrenemp && !processStartedRef.current) {
      processStartedRef.current = true;
      checkCameraPermissionAndStart();
    }
  }, [hrenemp]);

  const checkCameraPermissionAndStart = async () => {
    try {
      let permissionStatus;
      if (Platform.OS === 'android') {
        permissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      } else {
        permissionStatus = await check(PERMISSIONS.IOS.CAMERA);
      }
      
      if (isMountedRef.current) {
        const hasPermission = permissionStatus === RESULTS.GRANTED || 
                            permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
        
        setState(prev => ({
          ...prev,
          hasCameraPermission: hasPermission,
          modalVisible: true
        }));

        if (hasPermission) {
          startProcess();
        } else {
          showMessage(ERROR_MESSAGES.PERMISSION_DENIED, 'error');
        }
      }
    } catch (error) {
      console.error('Permission check error:', error);
      if (isMountedRef.current) {
        setState(prev => ({...prev, modalVisible: true}));
        showMessage('Error checking permissions', 'error');
      }
    }
  };

  const updateState = useCallback((newState) => {
    if (isMountedRef.current) {
      setState(prev => ({...prev, ...newState}));
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    clearTimer();
    updateState({countdown: COUNTDOWN_DURATION});

    timerRef.current = setInterval(() => {
      updateState(prev => {
        if (prev.countdown <= 1) {
          clearTimer();
          showMessage(ERROR_MESSAGES.TIME_UP, 'error');
          navigation.goBack();
          return {countdown: 0};
        }
        return {countdown: prev.countdown - 1};
      });
    }, 1000);
  }, [navigation, updateState, clearTimer]);

  const resetState = useCallback(() => {
    updateState({
      isMsgShow: false,
      msg: '',
      currentStep: 'Start',
      countdown: COUNTDOWN_DURATION,
      location: null,
      employeeData: null,
      isLoading: false,
    });
    clearTimer();
    processStartedRef.current = false;
  }, [updateState, clearTimer]);

  const startProcess = useCallback(() => {
    resetState();
    startCountdown();
    handleStartFaceScan();
  }, [resetState, startCountdown]);

  const handleStartFaceScan = useCallback(() => {
    updateState({currentStep: 'face'});
    navigation.navigate('CCaptureImageWithoutEdit', {
      hidebuttons: false,
      cameratype: 'front',
      onSelect: uploadFaceScan,
    });
  }, [navigation, updateState]);

  const uploadFaceScan = async (selfie) => {
    if (!selfie?.uri) {
      showMessage('Invalid image captured', 'error');
      return;
    }

    updateState({isLoading: true});

    try {
      const base64Image = await convertImageToBase64(selfie.uri);
      const response = await fetchWithTimeout(FACE_RECOGNITION_API, {
        method: 'POST',
        headers: {
          'hrenemp': hrenemp,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({image: base64Image}),
      }, 15000); // 15 seconds timeout

      const result = await response.json();
      
      if (response.ok && result.data?.employeename) {
        notifyMessage('Face authenticated');
        updateState({employeeData: result.data});
        setTimeout(startQRCodeScan, 2000);
      } else {
        const errorMsg = result.error || result.message || ERROR_MESSAGES.FACE_NOT_RECOGNIZED;
        handleUploadError(errorMsg);
      }
    } catch (error) {
      console.error('Face recognition error:', error);
      handleUploadError(ERROR_MESSAGES.SERVER_ERROR);
    } finally {
      updateState({isLoading: false});
    }
  };

  const fetchWithTimeout = async (url, options, timeout) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  const startQRCodeScan = useCallback(() => {
    updateState({currentStep: 'qr'});
    navigation.navigate('CCaptureImageWithoutEdit', {
      hidebuttons: true,
      cameratype: 'back',
      cameramoduletype: 2,
      onSelect: handleQRScanned,
    });
  }, [navigation, updateState]);

  const handleQRScanned = useCallback(async (qrCodeData) => {
    if (!qrCodeData) {
      showMessage(ERROR_MESSAGES.QR_INVALID, 'error');
      setTimeout(startQRCodeScan, 2000);
      return;
    }

    let qrString = typeof qrCodeData === 'object' ? qrCodeData.data : qrCodeData;
    if (!qrString || typeof qrString !== 'string') {
      showMessage(ERROR_MESSAGES.QR_INVALID, 'error');
      setTimeout(startQRCodeScan, 2000);
      return;
    }

    try {
      // Get current location
      const location = await getCurrentLocation();
      if (!location) {
        showMessage(ERROR_MESSAGES.LOCATION_ERROR, 'error');
        return;
      }

      // Parse QR coordinates
      const qrCoords = parseQRCoordinates(qrString);
      if (!qrCoords) {
        showMessage('⚠️ QR does not contain valid location data.', 'warning');
        return;
      }

      // Verify location
      const distance = getDistanceInMeters(
        qrCoords.lat,
        qrCoords.lng,
        location.latitude,
        location.longitude,
      );

      if (distance <= LOCATION_DISTANCE_THRESHOLD) {
        notifyMessage('✅ QR scanned successfully — location verified!');
        status(qrString);
      } else {
        notifyMessage(ERROR_MESSAGES.QR_LOCATION_MISMATCH);
      }
    } catch (error) {
      console.error('QR processing error:', error);
      notifyMessage('⚠️ Error processing QR code.');
    } finally {
      resetState();
      updateState({modalVisible: false});
    }
  }, [startQRCodeScan, status, resetState, updateState]);

  const getCurrentLocation = async () => {
    try {
      return await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          pos => resolve(pos.coords),
          error => {
            console.warn('Location fetch failed', error);
            reject(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } catch (error) {
      console.error('Location error:', error);
      return null;
    }
  };

  const parseQRCoordinates = (qrString) => {
    try {
      // Handle URL format
      if (qrString.includes('http') && qrString.includes('?')) {
        const url = new URL(qrString);
        const lat = parseFloat(url.searchParams.get('lat'));
        const lng = parseFloat(url.searchParams.get('lng'));
        if (!isNaN(lat) && !isNaN(lng)) return {lat, lng};
      }
      
      // Handle comma-separated format
      if (qrString.includes(',')) {
        const [latStr, lngStr] = qrString.split(',');
        const lat = parseFloat(latStr.trim());
        const lng = parseFloat(lngStr.trim());
        if (!isNaN(lat) && !isNaN(lng)) return {lat, lng};
      }
      
      return null;
    } catch (error) {
      console.error('QR parsing error:', error);
      return null;
    }
  };

  const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = val => (val * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Image conversion failed:', error);
      throw error;
    }
  };

  const handleUploadError = useCallback((message) => {
    Vibration.vibrate(VIBRATION_DURATION);
    showMessage(message, 'error');
  }, []);

  const showMessage = useCallback((message, type = 'info') => {
    updateState({
      msg: message,
      msgType: type,
      isMsgShow: true,
    });
    setTimeout(() => updateState({isMsgShow: false}), 5000);
  }, [updateState]);

   const closeModal = useCallback(() => {
    updateState({modalVisible: false});
    resetState();
  }, [resetState, updateState]);

  const {
    isLoading,
    isMsgShow,
    msg,
    msgType,
    currentStep,
    countdown,
    modalVisible,
    employeeData,
    hasCameraPermission,
  } = state;

  if (!hrenemp || !modalVisible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[
              styles.closeButton,
              {backgroundColor: Global.AppTheme.primary_color},
            ]}
            onPress={closeModal}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* Show the button only if process hasn't started automatically */}
          {!processStartedRef.current && (
            <TouchableOpacity
              style={[
                styles.captureButton,
                {backgroundColor: hasCameraPermission 
                  ? Global.AppTheme.primary_color 
                  : 'gray'},
              ]}
              onPress={startProcess}
              disabled={!hasCameraPermission}>
              <Text style={styles.countdownText}>
                Start Verification
              </Text>
            </TouchableOpacity>
          )}

          {/* Show progress circle always */}
          <View style={styles.progressCircleContainer}>
            <ProgressCircle
              percent={((countdown % COUNTDOWN_DURATION) / COUNTDOWN_DURATION) * 100}
              radius={normalize(16)}
              borderWidth={normalize(3)}
              color={
                countdown <= 15
                  ? '#ff4444'
                  : countdown <= 30
                  ? '#ffbb33'
                  : Global.AppTheme.primary_color
              }
              shadowColor="#f5f5f5"
              bgColor={'#fff'}>
              <Text style={styles.progressText}>
                {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, '0')}
              </Text>
            </ProgressCircle>
          </View>

          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loaderText}>
                {currentStep === 'face' ? 'Verifying face...' : 'Scanning QR...'}
              </Text>
            </View>
          )}

          {isMsgShow && (
            <View style={[styles.messageBox, getMessageBoxStyle(msgType)]}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          )}

          {employeeData && (
            <EmployeeCard employeeData={employeeData} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const EmployeeCard = ({employeeData}) => (
  <View style={styles.employeeCard}>
    {employeeData.imageurl && (
      <Image
        source={{uri: `${IMAGE_URL}${employeeData.imageurl}`}}
        style={styles.employeeImage}
        onError={() => console.log('Image load failed')}
      />
    )}
    <Text style={styles.employeeName}>{employeeData.employeeid}</Text>
    <Text style={styles.employeeName}>{employeeData.employeename}</Text>

    <View style={styles.detailsContainer}>
      <Text style={styles.employeeText}>
        Position: {employeeData.department || 'N/A'}
      </Text>
      <Text style={styles.employeeText}>
        Email: {employeeData.email || 'N/A'}
      </Text>
      <Text style={styles.employeeText}>
        Gender: {employeeData.gender === 'M' ? 'MALE' : 'FEMALE'}
      </Text>
      <Text style={styles.employeeText}>
        Address: {employeeData.housename || 'N/A'}
      </Text>
      <Text style={styles.employeeText}>
        Phone: {employeeData.mobile || 'N/A'}
      </Text>
    </View>

    <HOCIcons.Icons
      icongroup={3}
      name={'barcode'}
      color={Global.AppTheme.primary_color}
      size={normalize(30)}
      style={styles.barcodeIcon}
    />
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    zIndex: 10,
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  captureButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200,
  },
  countdownText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    marginRight: 12,
  },
  progressCircleContainer: {
    paddingLeft: 12,
  },
  progressText: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: '#333',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  loaderText: {
    marginTop: 12,
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
  messageBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  employeeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  employeeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  employeeName: {
    fontWeight: '600',
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  employeeText: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 4,
    paddingLeft: 12,
  },
  barcodeIcon: {
    marginTop: 8,
    textAlign: 'center',
  },
});

const getMessageBoxStyle = (type) => {
  const stylesMap = {
    success: {
      backgroundColor: '#e6ffed',
      borderColor: '#b7eb8f',
    },
    error: {
      backgroundColor: '#fff1f0',
      borderColor: '#ffa39e',
    },
    warning: {
      backgroundColor: '#fffbe6',
      borderColor: '#ffe58f',
    },
    info: {
      backgroundColor: '#e6f7ff',
      borderColor: '#91d5ff',
    },
  };
  return stylesMap[type] || stylesMap.info;
};

export default React.memo(FaceScan);