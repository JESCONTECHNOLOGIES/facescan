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
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Global} from 'facescan/src/Global';
import HOCIcons from 'facescan/src/HOCIcons';
import {normalize} from 'facescan/src/componentStyle';
import ProgressCircle from 'react-native-progress-circle';
import {PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {notifyMessage} from 'facescan/src/ComponentFunctions';

const IMAGE_URL = `http://api.amalaplus.org:9090/file/filedownload/photo/`;
const FACE_RECOGNITION_API = `http://api.amalaplus.org:9090/python/recognize`;

function CFaceScan(props) {
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: false,
    isMsgShow: false,
    msg: '',
    msgType: 'info',
    currentStep: 'Start',
    countdown: 60,
    location: null,
    employeeData: null,
    modalVisible: false,
  });

  const timerRef = useRef(null);
  const qrScanCallbackRef = useRef(null);

  // Set the QR scan callback using a ref
  useEffect(() => {
    qrScanCallbackRef.current = handleQRScanned;
  }, [handleQRScanned]);

  // Update state helper
  const updateState = newState => {
    setState(prev => ({...prev, ...newState}));
  };

  // Start countdown timer
  const startCountdown = useCallback(() => {
    updateState({countdown: 60});
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      updateState(prev => {
        if (prev.countdown <= 1) {
          clearInterval(timerRef.current);
          showMessage('⏰ Time is up!', 'error');
          navigation.goBack();
          return {countdown: 0};
        }
        return {countdown: prev.countdown - 1};
      });
    }, 1000);
  }, [navigation]);

  // Start the process
  const startProcess = useCallback(() => {
    resetState();
    startCountdown();
    handleStartFaceScan();
  }, [startCountdown]);

  useEffect(() => {
    console.log("START",JSON.stringify(props.response))
    if (props.response) {
      updateState({modalVisible: true});
      startProcess();
    }
  }, [props.response]);

  // Handle face scan
  const handleStartFaceScan = useCallback(() => {
    updateState({currentStep: 'face'});
    navigation.navigate('CCaptureImageWithoutEdit', {
      hidebuttons: false,
      cameratype: 'front',
      onSelect: uploadFaceScan,
    });
  }, [navigation]);

  // Upload face scan to the server
  const uploadFaceScan = async selfie => {
    updateState({isLoading: true});

    if(props.response){
      try {
      const base64Image = await convertImageToBase64(selfie.uri);
      console.log('REQUESTDATA----------', JSON.stringify(props.response.data?.userdata?.hrenemp));
      const response = await fetch(FACE_RECOGNITION_API, {
        method: 'POST',
        headers: {
          'hrenemp': props.response.data.userdata.hrenemp,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({image: base64Image}),
      });
      const result = await response.json();
      console.log('RESPONSEDATA----------', JSON.stringify(result));
      if (response.status === 200 && result.data?.employeename) {
        notifyMessage('Face authenticated');
        setTimeout(startQRCodeScan, 2000);
        updateState({employeeData: result.data});
      } else {
        const errorMsg =
          result.error ||
          result.message ||
          '❌ Face not recognized. Please try again.';
        handleUploadError(errorMsg);
      }
    } catch (error) {
      console.error('Face recognition error:', error);
      handleUploadError('❌ Could not connect to face recognition server.');
    } finally {
      updateState({isLoading: false});
    }
    }
    else{
      console.error('Hrenemp error:', error);
      handleUploadError('❌ Hrenemp error not found.');
    }
  };

  // Start QR code scan
  const startQRCodeScan = useCallback(() => {
    updateState({currentStep: 'qr'});
    navigation.navigate('CCaptureImageWithoutEdit', {
      hidebuttons: true,
      cameratype: 'back',
      cameramoduletype: 2,
      onSelect: handleQRScanned,
    });
  }, [navigation]);

  // Handle QR scan result
  const handleQRScanned = useCallback(
  async qrCodeData => {
    console.log('QRDATA---------------', JSON.stringify(qrCodeData));

    let qrString;
    if (typeof qrCodeData === 'object' && qrCodeData.data) {
      qrString = qrCodeData.data;
    } else {
      qrString = qrCodeData;
    }

    if (qrString && typeof qrString === 'string') {
      let lat = null;
      let lng = null;

      try {
        // Step 1: Get current location
        const location = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            pos => resolve(pos.coords),
            error => {
              console.warn('Location fetch failed', error);
              reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        });

        // Step 2: Parse QR code string for coordinates
        if (qrString.includes('http') && qrString.includes('?')) {
          const url = new URL(qrString);
          lat = parseFloat(url.searchParams.get('lat'));
          lng = parseFloat(url.searchParams.get('lng'));
        } else if (qrString.includes(',')) {
          const [latStr, lngStr] = qrString.split(',');
          lat = parseFloat(latStr.trim());
          lng = parseFloat(lngStr.trim());
        }

        console.log('Parsed QR lat/lng:', lat, lng);
        console.log('Current device location:', location.latitude, location.longitude);

        // Step 3: Validate coordinates before calculating distance
        if (
          !isNaN(lat) &&
          !isNaN(lng) &&
          !isNaN(location?.latitude) &&
          !isNaN(location?.longitude)
        ) {
          const distance = getDistanceInMeters(
            lat,
            lng,
            location.latitude,
            location.longitude
          );

          console.log('Distance (meters):', distance);

          if (distance <= 100) {
            notifyMessage('✅ QR scanned successfully — location verified!');
            props.login(props.response);
          } else {
            notifyMessage('❌ QR scanned, but location mismatch!');
          }
        } else {
          console.warn('Invalid coordinates found during distance check.');
          notifyMessage('⚠️ QR does not contain valid lat/lng data.');
        }
      } catch (err) {
        console.error('QR/location processing failed:', err);
        notifyMessage(`⚠️ Error: ${err.message || 'Unknown error occurred'}`);
      }

      // Reset UI state
      resetState();
      updateState({
        modalVisible: false,
        currentStep: 'Start',
      });
    } else {
      notifyMessage('❌ QR scan failed. Please try again.');
      setTimeout(startQRCodeScan, 2000);
    }
  },
  [startQRCodeScan, props.login]
);


  function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    const toRad = val => (val * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Convert image to base64
  const convertImageToBase64 = async uri => {
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

  // Handle upload errors
  const handleUploadError = useCallback(message => {
    Vibration.vibrate(500);
    showMessage(message, 'error');
  }, []);

  // Show message to the user
  const showMessage = useCallback((message, type = 'info') => {
    updateState({
      msg: message,
      msgType: type,
      isMsgShow: true,
    });
    setTimeout(() => updateState({isMsgShow: false}), 5000);
  }, []);

  // Reset component state
  const resetState = useCallback(() => {
    updateState({
      isMsgShow: false,
      msg: '',
      currentStep: 'Start',
      countdown: 60,
      location: null,
      employeeData: null,
    });
    clearInterval(timerRef.current);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.modalVisible]);

  if (!props.response) return null;

  const {
    isLoading,
    isMsgShow,
    msg,
    msgType,
    currentStep,
    countdown,
    modalVisible,
    employeeData,
  } = state;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        updateState({modalVisible: false});
        resetState();
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[
              styles.closeButton,
              {backgroundColor: Global.AppTheme.primary_color},
            ]}
            onPress={() => {
              updateState({modalVisible: false});
              resetState();
            }}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              {backgroundColor: Global.AppTheme.primary_color},
            ]}
            onPress={startProcess}>
            <Text style={styles.countdownText}>
              {currentStep === 'face'
                ? 'Scan Face'
                : currentStep === 'qr'
                ? 'QR Scan'
                : 'Start'}
            </Text>

            <View style={styles.progressCircleContainer}>
              <ProgressCircle
                percent={((countdown % 60) / 60) * 100}
                radius={normalize(16)}
                borderWidth={normalize(3)}
                color={
                  countdown <= 30
                    ? 'red'
                    : countdown <= 59
                    ? '#2ecc71'
                    : Global.AppTheme.primary_color
                }
                shadowColor="lightgrey"
                bgColor={'#fff'}>
                <Text style={styles.progressText}>
                  {Math.floor(countdown / 60)}:
                  {(countdown % 60).toString().padStart(2, '0')}
                </Text>
              </ProgressCircle>
            </View>
          </TouchableOpacity>

          {/* Loading Modal */}
          <Modal visible={isLoading} transparent animationType="fade">
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loaderText}>Checking... Please wait</Text>
            </View>
          </Modal>

          {/* Message Box */}
          {isMsgShow && (
            <View style={[styles.messageBox, getMessageBoxStyle(msgType)]}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          )}

          {/* Employee Card */}
          {employeeData?.imageurl && (
            <View style={styles.employeeCard}>
              <Image
                source={{uri: `${IMAGE_URL}${employeeData.imageurl}`}}
                style={styles.employeeImage}
              />
              <Text style={styles.employeeName}>{employeeData.employeeid}</Text>
              <Text style={styles.employeeName}>
                {employeeData.employeename}
              </Text>

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

              <View>
                <HOCIcons.Icons
                  icongroup={3}
                  name={'barcode'}
                  color={Global.AppTheme.primary_color}
                  size={normalize(30)}
                  style={styles.barcodeIcon}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

// Styles remain the same as in your original code
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    padding: 10,
  },
  contentContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#003cff',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  countdownText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  progressCircleContainer: {
    paddingLeft: 10,
  },
  progressText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: 'black',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  loaderText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  messageBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 4,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  employeeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  employeeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  detailsContainer: {
    width: '100%',
    marginVertical: 10,
  },
  employeeText: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 2,
    paddingLeft: 15,
  },
  barcodeIcon: {
    borderWidth: 0,
    width: '100%',
    textAlign: 'center',
  },
});

const getMessageBoxStyle = type => {
  const stylesMap = {
    success: {backgroundColor: '#d4edda', borderColor: '#c3e6cb'},
    error: {backgroundColor: '#f8d7da', borderColor: '#f5c6cb'},
    warning: {backgroundColor: '#fff3cd', borderColor: '#ffeeba'},
    info: {backgroundColor: '#d1ecf1', borderColor: '#bee5eb'},
  };
  return stylesMap[type] || stylesMap.info;
};

export default CFaceScan;
