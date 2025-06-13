
import ComponentStyles from 'facescan/src/componentStyle';
import { colors, fontWeight } from 'facescan/src/commonStyle';
import {
    ToastAndroid,
    Platform,
    Alert,
    PermissionsAndroid,
    ActivityIndicator,
    DeviceEventEmitter,
    PixelRatio,
    Dimensions,
    View
} from 'react-native';
import Sound from 'react-native-sound';
import NetInfo from "@react-native-community/netinfo";
import FastImage from 'react-native-fast-image';
import { Global } from 'facescan/src/Global';
// import codePush from "react-native-code-push";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function getSound(code) {
    Sound.setCategory('Playback');
    const track = new Sound(code, Sound.MAIN_BUNDLE, (e) => {
        if (e) {
            console.log('error loading track:', e)
        } else {
            console.log('Playings')
            track.play()
        }
    })
}

export function CButtonShadow() {

    const isAndroidBelow9 = Platform.OS === 'android' && Platform.Version < 28;
    return isAndroidBelow9 ? {
        elevation: 10,
        shadowColor: Global.AppTheme.primary_color,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0,
        shadowRadius: 20
    } : {
        boxShadow: `-3 3 6 -1 ${Global.AppTheme.primary_color}`
    };  // offsetX  offsetY blurRadius spreadDistance color
}

export function CFooterShadow() {

    const isAndroidBelow9 = Platform.OS === 'android' && Platform.Version < 28;
    return isAndroidBelow9 ? {
        elevation: 10,
        shadowColor: Global.AppTheme.primary_color,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0,
        shadowRadius: 20
    } : {
        boxShadow: `0 4 10 0 ${Global.AppTheme.primary_color}`
    };  // offsetX  offsetY blurRadius spreadDistance color
}

export function LoaderIndicator(i) {

    return (

        <View style={{
            backgroundColor: '#ffffff',
            padding: normalize(10),
            paddingHorizontal: normalize(20),
            borderRadius: 10,
            alignItems: 'center',
        }}>
            <FastImage
                style={{
                    width: normalize(35),
                    height: normalize(35),
                }}
                // source={require('../Assets/gif/loading.gif')}
                source={require('facescan/src/Asset/gif/heartpulse.gif')}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    )

}

export function normalize(size) {
    const newSize = scale < 1.5 ? size * scale : size * 1.6
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export function Loader() {
    return (
        <ActivityIndicator size={normalize(30)} style={{ marginTop: normalize(10) }} color="red" />
    )
}

export async function getAppVersion() {
    var Ver = 1.1
    const Results = await codePush.getUpdateMetadata()
    if (Results) {
        if (Results.isPending == false) {
            Ver = Results.appVersion + Results.label
        } else {
            Ver = Results.appVersion + Results.label + " NOT UPDATED !!!"
        }
    }
    return Ver
};


/**
    * To check whether value is true && null && undefined
 */
export function isBNU(i) {
    return (i && i != null && i != undefined ? true : false)
}

/**
    * To check whether value is null && undefined
 */
export function isNU(i) { return (i != null && i != undefined ? true : false) }

/**
    * To check whether value is  null && undefined && length > 0
 */
export function isNUL(i) { return (i != null && i != undefined && i.length > 0 ? true : false) }

/**
    * To check whether value is  null && undefined && !=""
 */
export function isNUQ(i) { return (i != null && i != undefined && i != "" ? true : false) }

/**
    * To check whether value is  null && undefined && !="" && != 0
 */
export function isNUQZ(i) { return (i != null && i != undefined && i != "" && i != 0 ? true : false) }

/**
    * To check whether value is true && null && undefined && length > 0
 */
export function isBNUL(i) {
    return (i && i != null && i != undefined && i.length > 0 ? true : false)
}

export function isOrganism(i) {
    return (i == 3 ? true : false)
}

export function isDescription(i) {
    return (i == 1 || i == 6 || i == 7 || i == 8 ? true : false)
}

export function isValueBased(i) {
    return (i == 2 || i == 4 || i == 5 ? true : false)
}

export function dlog(i) {
    if (__DEV__) {
        return console.log(i)
    }
    else {

    }
}

export function cdev() {
    if (__DEV__) {
        return true
    }
    else {
        return false
    }
}

export function clog(i) {
    return console.log(i)
}




export function ValueCheck(value) {
    if (value) {
        return true
    } else {
        false
    }
}

export function convertStringToArrayWeekDay(inputString) {
    const days = [
        { datavalue: 1, displayvalue: "Su", selected: true },
        { datavalue: 2, displayvalue: "M", selected: true },
        { datavalue: 3, displayvalue: "Tu", selected: true },
        { datavalue: 4, displayvalue: "W", selected: true },
        { datavalue: 5, displayvalue: "Th", selected: true },
        { datavalue: 6, displayvalue: "F", selected: true },
        { datavalue: 7, displayvalue: "Sa", selected: true },
    ];
    const selectedDays = inputString.split(",").map(Number);
    return days.map((day) => {
        return {
            datavalue: day.datavalue,
            displayvalue: day.displayvalue,
            selected: selectedDays.includes(day.datavalue) ? false : true,
            // selected: day.selected,
        };
    });
}

export function ArrayCheck(value) {
    if (value && value.length > 0) {
        return true
    } else {
        false
    }
}

export async function isPermitted() {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            alert('File access Permission not allowed', err);
            return false;
        }
    } else {
        return true;
    }
}

export function getLoading(load) {
    setTimeout(load, 15000)
}
export function isDes(i) {
    return (i == 1 ? true : false)
}

export function isVal(i) {
    return (i == 2 ? true : false)
}

export function isOrg(i) {
    return (i == 3 ? true : false)
}

export function isSero(i) {
    return (i == 4 ? true : false)
}

export function isViro(i) {
    return (i == 5 ? true : false)
}

export function isPath(i) {
    return (i == 6 ? true : false)
}

export function isConnected() {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            console.log("Is Internet?", state.isInternetReachable);
            console.log("Details: - ", state.details);

            if (state.isConnected && state.isInternetReachable) {
                resolve();
            }
            else {
                reject();
            }
        });
    })
}

//Footer icon
export function getFooterIcon(opacity) {
    return (
        {
            ...ComponentStyles.footer_Icon,
            opacity: opacity,
        }
    )
}

export function notifyMessage(msg, type) {
    DeviceEventEmitter.emit("event.testToast", {
        "displaytext": msg,
        "datavalue": type,
    })

    // let X = bottom != undefined && bottom != null ? bottom : 80
    // if (Platform.OS === 'android') {
    //     ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM,
    //         0,
    //         X)
    // } else {
    //     Alert.alert(msg);
    // }
}

export function getFooterIconText(opacity, color) {
    return (
        {
            ...ComponentStyles.footer_Icon_Text,
            opacity: opacity,
            color: color,
        }
    )
}

// Header Section

export function getHeaderBlockContainer(width) {
    return (
        {
            ...ComponentStyles.header_section_conatiner_style,
            width: width,
            paddingTop: '5%',
        }
    )
}
export function getHeaderTitleContainer(width) {
    return (
        {
            justifyContent: 'flex-end', paddingLeft: width * 0.02,
        }
    )
}

export function getResultViewObservedvalueTextvalidate(value, minvalue, maxvalue, datatype) {
    switch (datatype) {
        case "integer":
        case "numeric":
            if (minvalue != null && minvalue != undefined && value < minvalue) {
                return colors.color_resulttext_low
            }
            else if (maxvalue != null && maxvalue != undefined && value > maxvalue) {
                return colors.color_resulttext_high
            }
            else {
                return colors.color_resulttext_normal
            }
            break;
        default:
            return colors.color_resulttext_normal
    }
}

// Profile Card

export function getProfileMainContainer(item) {
    console.log("getProfileMainContainer", item)
    return (
        {
            width: '96%',
            backgroundColor: "#fff",
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10, elevation: 5,
            marginBottom: 5,
            borderWidth: 0.1,
            borderLeftWidth: 5,
            borderColor: item.bordercolor ? item.bordercolor : "lightgreen",
        }
    )
}
export function getProfileContentLeftlogo1(item) {
    return (
        {
            borderRadius: 0,
            // backgroundColor: "blue",
            padding: 5,
            color: "black",
            fontWeight: 'bold', fontSize: normalize(11),
        }
    )
}
export function getProfileContentLeftlogo2() {
    return (
        {
            backgroundColor: "#fcb5b5",
            padding: 5,
            borderRadius: 50,
            color: "black",
            fontSize: normalize(10),
        }
    )
}
export function getProfileContentLogo1() {
    return (
        {
            fontSize: normalize(13),
            marginTop: 3,
            color: 'black',
            fontWeight: 'bold'
        }
    )
}
export function getProfileContentLogo2() {
    return (
        {
            fontSize: normalize(10),
            color: "black",
        }
    )
}
export function getProfilecardSubheadingTop(color) {
    return (
        {
            fontSize: normalize(10),
            fontWeight: fontWeight.fontWeight_700,
            color: color,
            // padding: 5,
            paddingBottom: 0,
            paddingTop: 2,
        }
    )
}
export function getProfilecardSubheadingBottom(color, position) {
    return (
        {
            fontSize: normalize(10),
            fontWeight: fontWeight.fontWeight_100,
            color: color,
            paddingLeft: position == "right" ? 5 : 0,
            paddingRight: position == "left" ? 5 : 0,
        }
    )
}

export function getProfilecardMobileNO(color, position) {
    return (
        {
            fontSize: normalize(12),
            // fontWeight: fontWeight.fontWeight_100,
            fontWeight: fontWeight.fontWeight_Bold,
            color: color,
            paddingLeft: position == "right" ? 5 : 0,
            paddingRight: position == "left" ? 5 : 0,
        }
    )
}
export function getProfilecardOnlineStatusBadgeContainer(backgroundcolor) {
    return (
        {
            backgroundColor: backgroundcolor,
            height: normalize(20),
            // width:normalize(28),
            paddingHorizontal: normalize(5),
            borderRadius: 1000,
            padding: 0,
            //elevation: 5,
            //borderColor:backgroundcolor,
            //borderWidth:1
        }
    )
}
export function getGroupButtonView(width) {
    return (
        {
            justifyContent: 'center', margin: 5,
            width: width * 0.10,
            alignContent: 'center', alignItems: 'center',
        }
    )
}
export function getMediaoverlayContainerStyle(height) {
    return (
        {
            ...ComponentStyles.mediaoverlay_containerstyle,
            height: height,
        }
    )
}
export function getMediaViewContainer(width, height, itemwidth) {
    return (
        {
            ...ComponentStyles.View_col_center,
            width: width * (itemwidth / 100),
            margin: height * 0.003,
        }
    )
}
export function getMediaViewChildContainer(width, itemwidth) {
    return (
        {
            borderWidth: 0.5,
            borderRadius: 2,
            width: width * (itemwidth / 100),
            borderColor: colors.color_componentBordercolor,
        }
    )
}
export function getMediaIcon(width, itemwidth) {
    return (
        {
            height: 120,
            width: width * (itemwidth / 100),
        }
    )
}
export function getMediaoverlayChildrenwrapperStyle(width, height, itemheight) {
    return (
        {
            width: width,
            height: itemheight,
            padding: height * 0.01,
        }
    )
}
export function getMediaoverlayTopLineContainer(width, height) {
    return (
        {
            ...ComponentStyles.View_col_center,
            width: width * 0.15, height: height * 0.02,
        }
    )
}
export function getMediaoverlayOptionRow(width, height) {
    return (
        {
            ...ComponentStyles.View_row_spacearound,
            borderRadius: 14,
            marginTop: height * 0.02, width: width * 0.90,
        }
    )
}
export function getMediaoverlayOptionContainer(width, height) {
    return (
        {
            ...ComponentStyles.View_col_center,
            margin: 5,
            height: height * 0.1,
            width: width * 0.20,
        }
    )
}
export function getMediaoverlayMsgorLoaderView(height) {
    return (
        {
            height: height,
            ...ComponentStyles.View_col_center,
        }
    )
}
export function getMediaGalleryChildContainer(width, height) {
    return (
        {
            marginTop: height * 0.01, width: width * 0.90,
            justifyContent: 'center', alignItems: 'center',
        }
    )
}
export function getMediaGalleryDeleteView(width, height) {
    return (
        {
            borderWidth: 0.5, borderRadius: 2,
            height: height / 5, width: width * 0.90,
            borderColor: colors.color_componentBordercolor,
            alignItems: 'center', justifyContent: 'center',
        }
    )
}
export function getMediaIconStyle(width, height) {
    return (
        {
            height: height / 5, width: width * 0.90,
        }
    )
}
export function getMediaGalleryDeleteIcon(width) {
    return (
        {
            height: '40%', width: width * 0.90, resizeMode: 'contain',
        }
    )
}