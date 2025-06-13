export class Global {
    static userData;
    static HospitalData;
    static PatientDetails;
    static ChartDataAll;
    static ChartDataLeft;
    static ChartDataRight;
    static ipAddress;
    static port;
    static ApiVersion;
    static userOptionList = [];
    static DosageArray = [];
    static currentPageInfo = {};
    static deviceID = "";
    static AllMedicinesArr = []
    static isdefault = false
    static refreshcount = 0;
    static EditStatus;
    static ParameterInfo;
    static FirmDetails;
    static LoginTime;
    static JWTToken = ""
    static CodePushVersion
    static InstallationKey = ""
    static AppTheme = {
        "primary_color": "#094485",
        "secondary_color": "black",
        "text_color": "#fff",
        "heading_text_color": "darkblue",
        "bg_button": "#fff",
        "icon_color": "darkblue"
    };

    // static ipAddress =  "122.15.161.229"; // static ip jescon : "111.92.109.30" 192.168.1.3
    // static ipAddress = "115.241.226.134"; // static ip jescon : "111.92.109.30" 192.168.1.3
    static ipAddress = "api.amalaplus.org"; // static ip jescon : "111.92.109.30" 192.168.1.3
    // static port = "9192";
    // static port = "9494";
    static port = "9090";
    static version = 4
    static MessageKey = 5;
    static hospitalcode = "JTPL8090";
    static hospitalname = "Amala Hospital";
    static hospitaladdress = "Thrissur, Kerala";
    static hospitalnabh = '(NABH Accredited and ISO 9001 2015 Certified)';
    static hospitalmore = '(An undertaking of Amala Cancer hospital Society) Amala Nagar, Thrissur';
    static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.amalaims.org; ';
    static hospitalemail = 'Email: amalamch@amalaims.org';
    static hospitallogo = [
        require('facescan/src/Asset/images/amalainstitute.png'),
        require('facescan/src/Asset/images/amalalogo.jpg'),
        "https://i.ibb.co/7nPcjFN/amalalogo.jpg",
        "https://i.ibb.co/ggh54M0/rtlogo.png",
        require('facescan/src/Asset/images/rtlogo.png'),
        { width: 45, height: 45 },
        "https://i.ibb.co/JxwPfh7/amalalogo-New-Style-removebg-preview.png"
    ];
    // static licenseIp = "http://" + Global.ipAddress + ":" + Global.port + "/validation/licensedata/licensevalidation ";
    static licenseIp = 'http://' + Global.ipAddress + ':' + '9090/hislicensevalidation/licensedata/licensevalidation'
    static xRay = "http://14.98.111.102:23666/PACSLogin";
    static headerfooter = [
        "http://" + Global.ipAddress + ":" + Global.port + "/file/getCommonFile/image/amalaheader.png",
        "http://" + Global.ipAddress + ":" + Global.port + "/file/getCommonFile/image/amalafooteredited.png"
    ];
    static asyncStorageAppKey = '@storage_KeyEMRTest';
    static asyncStorageThemeKey = '@storage_ThemeEMRTest';
    // static preinstallationkey = 'amala@jescon';
    static preinstallationkey = 'his@amala';
    static versiondate = '19.02.2025.2';
    static SplashHeading = 'HIS AMALA BETA TESTING';


    // static ipAddress = "103.171.224.161"; // static ip jescon : "111.92.109.30" 192.168.1.3
    // static port = "9595";
    // static version = "8";
    // static hospitalcode = "DH9192"; //JTPL8090
    // static hospitalname = "Devamatha Hospital";
    // static hospitaladdress = "Koothattukulam, Ernakulam";
    // static hospitalnabh = '(NABH Accredited (Entry Level))';
    // static hospitalmore = '(Devamatha Hospital is the fulfillment of a long-cherished dream of the people of KOOTHATTUKULAM';
    // static hospitalwebsite = 'Pin: 686662 Ph: (0485) 2468000; Web: www.devamathahospital.org;';
    // static hospitalemail = 'Email: info@devamathahospital.org';
    // static hospitallogo = [
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     "https://i.ibb.co/z2sVv92/Devamatha-Logo.jpg",
    //     "https://firebasestorage.googleapis.com/v0/b/emrapp-67396.appspot.com/o/AppImages%2Fnirmalanabh.jpg?alt=media&token=cfbfc02f-65a5-4d68-ac8f-4747e30137c5",
    //     require('../Asset/images/nirmalanabh.jpeg'),
    //     { width: 60, height: 45 },
    //     "https://www.devamathahospital.org/images/logo.png"]
    // static licenseIp = "http://" + Global.ipAddress + ":" + Global.port + "/validation/licensedata/licensevalidation ";
    // static xRay = "http://14.98.111.102:23666/PACSLogin";
    // static headerfooter = [
    //   "http://" + Global.ipAddress + ":" + Global.port + "/file/getCommonFile/image/header.png",
    //   "http://" + Global.ipAddress + ":" + Global.port + "/file/getCommonFile/image/footer.png"
    // ];
    // static asyncStorageAppKey = '@storage_KeyEMRDMTest';
    // static asyncStorageThemeKey = '@storage_ThemeEMRDMTest';
    // static preinstallationkey = 'emr@devamatha';
    // static versiondate = '04.02.2025';
    // static SplashHeading = 'EMR DEVAMATHA BETA TESTING';


    // static ipAddress = "192.168.1.3"; // static ip jescon : "111.92.109.30" 192.168.1.3
    // static port = "9192";
    // static version = "8";
    // static hospitalcode = "JTPL9192";
    // static hospitalname = "Jescon";
    // static hospitaladdress = "Thrissur, Kerala";
    // static hospitalnabh = '(NABH Accredited and ISO 9001 2015 Certified)';
    // static hospitalmore = '(An undertaking of Amala Cancer hospital Society) Amala Nagar, Thrissur';
    // static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.amalaims.org; ';
    // static hospitalemail = 'Email: amalamch@amalaims.org';
    // static hospitallogo = [
    //     require('../Asset/images/amalainstitute.png'),
    //     require('../Asset/images/amalalogo.jpg'),
    //     "https://i.ibb.co/7nPcjFN/amalalogo.jpg",
    //     "https://i.ibb.co/ggh54M0/rtlogo.png",
    //     require('../Asset/images/rtlogo.png'),
    //     { width: 45, height: 45 },
    //     "https://i.ibb.co/JxwPfh7/amalalogo-New-Style-removebg-preview.png"
    // ];
    // static licenseIp = "http://" + Global.ipAddress + ":" + Global.port + "/validation/licensedata/licensevalidation ";
    // static xRay = "http://14.98.111.102:23666/PACSLogin";
    // static headerfooter = [
    //     "http://" + Global.ipAddress + ":" + Global.port + "/labfile/getCommonFile/image/amalaheader.png",
    //     "http://" + Global.ipAddress + ":" + Global.port + "/labfile/getCommonFile/image/amalafooteredited.png"
    // ];
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';



    // static ipAddress = "192.168.1.3"; // static ip jescon : "111.92.109.30" 192.168.1.3
    // static port = "9192";
    // static version = "8";
    // static hospitalcode = "AIMS8090";
    // static hospitalname = "Jescon";
    // static hospitaladdress = "Thrissur, Kerala";
    // static hospitalnabh = '(NABH Accredited and ISO 9001 2015 Certified)';
    // static hospitalmore = '(An undertaking of Amala Cancer hospital Society) Amala Nagar, Thrissur';
    // static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.amalaims.org; ';
    // static hospitalemail = 'Email: amalamch@amalaims.org';
    // static hospitallogo = [
    //     require('../Asset/images/amalainstitute.png'),
    //     require('../Asset/images/amalalogo.jpg'),
    //     "https://i.ibb.co/7nPcjFN/amalalogo.jpg",
    //     "https://i.ibb.co/ggh54M0/rtlogo.png",
    //     require('../Asset/images/rtlogo.png'),
    //     { width: 45, height: 45 },
    //     "https://i.ibb.co/JxwPfh7/amalalogo-New-Style-removebg-preview.png"
    // ];
    // static licenseIp = "http://" + Global.ipAddress + ":" + Global.port + "/validation/licensedata/licensevalidation ";
    // static xRay = "http://14.98.111.102:23666/PACSLogin";
    // static headerfooter = [
    //     "http://" + Global.ipAddress + ":" + Global.port + "/labfile/getCommonFile/image/amalaheader.png",
    //     "http://" + Global.ipAddress + ":" + Global.port + "/labfile/getCommonFile/image/amalafooteredited.png"
    // ];
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';

    // static ipAddress = "emr.amalaims.org"; // staic ip amala : "14.98.111.101" 
    // static port = "9393";
    // static version = "8";
    // static hospitalcode = "AIMS8090"
    // static hospitalname = "Amala Institute Of Medical Sciences";
    // static hospitaladdress = "Thrissur, Kerala";
    // static hospitalnabh = '(NABH Accredited and ISO 9001 2015 Certified)';
    // static hospitalmore = '(An undertaking of Amala Cancer hospital Society) Amala Nagar, Thrissur';
    // static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.amalaims.org; ';
    // static hospitalemail = 'Email: amalamch@amalaims.org';
    // static hospitallogo = [require('../Asset/images/amalainstitute.png'),
    // require('../Asset/images/amalalogo.jpg'),
    //     "https://i.ibb.co/7nPcjFN/amalalogo.jpg",
    //     "https://i.ibb.co/ggh54M0/rtlogo.png",
    // require('../Asset/images/rtlogo.png'),
    // { width: 45, height: 45 },
    //     "https://i.ibb.co/JxwPfh7/amalalogo-New-Style-removebg-preview.png"]
    // static licenseIp = "http://emr.amalaims.org:9393/validation/licensedata/licensevalidation "
    // static xRay = "http://14.98.111.102:23666/PACSLogin"
    // static headerfooter = ["http://his.amalaims.org:9292/labfile/getCommonFile/image/amalaheader.png",
    //     "http://his.amalaims.org:9292/labfile/getCommonFile/image/amalafooteredited.png"]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';


    // static ipAddress = "111.92.109.30"; // static ip jescon :"192.168.0.22" "111.92.109.30"
    // static port = "8090";
    // static version = "140";
    // static hospitalcode = "JTPL8090"
    // static hospitalname = "JESCON TECHNOLOGIES PVT LTD EMR DEMO";
    // static hospitaladdress = "Thrissur, Kerala";
    // static hospitalnabh = '(NABH Accredited and ISO 9001 2019 Certified)';
    // static hospitalmore = '(An undertaking of Jescon Technologies Pvt Ltd, Thrissur';
    // static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.jescontechnologies.com; ';
    // static hospitalemail = 'Email: jescontechnologies@gmail.com';
    // static hospitallogo = [require('../Asset/images/jes.png'),
    // require('../Asset/images/jes.png'),
    //     "https://i.ibb.co/5kmvNPK/jes.png",
    //     "https://i.ibb.co/5kmvNPK/jes.png",
    // require('../Asset/images/rtlogo.png'),
    // { width: 45, height: 45 },
    //     "https://i.ibb.co/dkNbcDN/jesconnewlogo.jpg"]
    // static licenseIp = "http://111.92.109.30:8082/licensedata/licensevalidation "
    // static headerfooter = ["http://his.amalaims.org:9292/labfile/getCommonFile/image/amalaheader.png",
    //     "http://his.amalaims.org:9292/labfile/getCommonFile/image/amalafooteredited.png"]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';


    // static ipAddress = "59.92.234.144"; // static ip nirmala = "59.92.234.144"
    // static port = "8090";
    // static version = "7"
    // static hospitalcode = "NMC8090"
    // static hospitalname = "Nirmala Medical Centre";
    // static hospitaladdress = "Muvattupuzha, Kerala";
    // static hospitalnabh = '(NABH Accredited (Entry Level))';
    // static hospitalmore = '( Muvattupuzha, Ernakulam';
    // static hospitalwebsite = 'Pin: 686661 Ph: (0485) 2835343; Web: www.nirmalamedicalcentre.com; ';
    // static hospitalemail = 'Email: contact@nirmalamedicalcentre.com';
    // static hospitallogo = [
    //     require('../Asset/images/amalalogoN.jpg'),
    //     require('../Asset/images/amalalogoN.jpg'),
    //     "https://i.ibb.co/QpnkSY4/nirmalalogo.jpg",
    //     "https://firebasestorage.googleapis.com/v0/b/emrapp-67396.appspot.com/o/AppImages%2Fnirmalanabh.jpg?alt=media&token=cfbfc02f-65a5-4d68-ac8f-4747e30137c5",
    //     require('../Asset/images/nirmalanabh.jpeg'),
    //     { width: 60, height: 45 },
    //     "https://i.ibb.co/tzFykMP/169285578127377075.png"]
    // static xRay = "http://172.16.1.201:5000/#/"
    // static licenseIp = "http://59.92.234.144:8090/validation/licensedata/licensevalidation "
    // static headerfooter = ["http://59.92.234.144:9192/labfile/getCommonFile/image/header.png",
    //     "http://59.92.234.144:9192/labfile/getCommonFile/image/footer.png",]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';


    // static ipAddress = "103.171.224.161"; // static ip devamatha = "59.92.234.144"
    // static port = "9192";
    // static version = "13"
    // static hospitalcode = "DH9192"
    // static hospitalname = "Devamatha Hospital";
    // static hospitaladdress = "Koothattukulam, Ernakulam";
    // static hospitalnabh = '(NABH Accredited (Entry Level))';
    // static hospitalmore = '(Devamatha Hospital is the fulfillment of a long-cherished dream of the people of KOOTHATTUKULAM';
    // static hospitalwebsite = 'Pin: 686662 Ph: (0485) 2468000; Web: www.devamathahospital.org; ';
    // static hospitalemail = 'Email: info@devamathahospital.org';
    // static hospitallogo = [
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     "https://i.ibb.co/z2sVv92/Devamatha-Logo.jpg",
    //     "https://firebasestorage.googleapis.com/v0/b/emrapp-67396.appspot.com/o/AppImages%2Fnirmalanabh.jpg?alt=media&token=cfbfc02f-65a5-4d68-ac8f-4747e30137c5",
    //     require('../Asset/images/nirmalanabh.jpeg'),
    //     { width: 60, height: 45 },
    //     "https://www.devamathahospital.org/images/logo.png"]
    // static licenseIp = "http://103.171.224.161:9192/validation/licensedata/licensevalidation "
    // static headerfooter = ["http://103.171.224.161:9192/labfile/getCommonFile/image/header.png",
    //     "http://103.171.224.161:9192/labfile/getCommonFile/image/footer.png",]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';


    // static ipAddress = "192.168.100.5"; // static ip jescondevamatha = "59.92.234.144"
    // static port = "9192";
    // static version = "10"
    // static hospitalcode = "DH9192"
    // static hospitalname = "Jescon/Devamatha Hospital";
    // static hospitaladdress = "Koothattukulam, Ernakulam";
    // static hospitalnabh = '(NABH Accredited (Entry Level))';
    // static hospitalmore = '(Devamatha Hospital is the fulfillment of a long-cherished dream of the people of KOOTHATTUKULAM';
    // static hospitalwebsite = 'Pin: 686662 Ph: (0485) 2468000; Web: www.devamathahospital.org; ';
    // static hospitalemail = 'Email: info@devamathahospital.org';
    // static hospitallogo = [
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     require('../Asset/images/DevamathaLogo.jpg'),
    //     "https://i.ibb.co/z2sVv92/Devamatha-Logo.jpg",
    //     "https://firebasestorage.googleapis.com/v0/b/emrapp-67396.appspot.com/o/AppImages%2Fnirmalanabh.jpg?alt=media&token=cfbfc02f-65a5-4d68-ac8f-4747e30137c5",
    //     require('../Asset/images/nirmalanabh.jpeg'),
    //     { width: 60, height: 45 },
    //     "https://i.ibb.co/dkNbcDN/jesconnewlogo.jpg"]
    // static licenseIp = "http://"+Global.ipAddress+":"+Global.port+"/validation/licensedata/licensevalidation "
    // static headerfooter = ["http://103.171.224.161:9192/labfile/getCommonFile/image/header.png",
    //     "http://103.171.224.161:9192/labfile/getCommonFile/image/footer.png",]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';




    // static ipAddress = "45.116.228.73"; // static ip mmt = "45.116.228.73"
    // static port = "9292";
    // static version = 5;
    // static hospitalcode ="MMT9292"
    // static hospitalname = "Mundakayam Medical Trust Hospital";
    // static hospitaladdress = "Idukki, Kerala";
    // static hospitalnabh = '(NABH Accredited [Entry Level])';
    // static hospitalmore = 'We take good care';
    // static hospitalwebsite = 'Pin: 686 513 Ph: 94464 62400 ; Web: mmthospital.com; ';
    // static hospitalemail = 'Email: mmthospital@gmail.com';
    // static hospitallogo = [require('../Asset/images/mundakayamlogo.png'),
    // require('../Asset/images/mundakayamlogo.png'),
    //     "https://i.ibb.co/2KJPWJK/mmtlogo.png",
    //     "https://i.ibb.co/2KJPWJK/mmtlogo.png",
    // require('../Asset/images/mundakayamlogo.png'),
    // { width: 60, height: 45 },
    //     "https://mmthospital.com/theme_assets/images/mundakkayam-medical-trust-hospital-logo.png"]
    // static licenseIp = "http://45.116.228.73:9292/validation/licensedata/licensevalidation "
    //   static headerfooter = ["http://45.116.228.73:9292/labfile/getCommonFile/image/header.png",
    //     "http://45.116.228.73:9292/labfile/getCommonFile/image/footer.png"]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';

    // static ipAddress = "111.92.109.30"; // static ip jescon :"192.168.0.22" "111.92.109.30"
    // static port = "8080";
    // static version = "140";
    // static hospitalcode = "JES8090JWT"
    // static hospitalname = "Amala Institute Of Medical Sciences";
    // static hospitaladdress = "Thrissur, Kerala";
    // static hospitalnabh = '(NABH Accredited and ISO 9001 2015 Certified)';
    // static hospitalmore = '(An undertaking of Amala Cancer hospital Society) Amala Nagar, Thrissur';
    // static hospitalwebsite = 'Pin: 680 555 Ph: (0487) 230 4000; Web: www.amalaims.org; ';
    // static hospitalemail = 'Email: amalamch@amalaims.org';
    // static hospitallogo = [require('../Asset/images/amalainstitute.png'),
    // require('../Asset/images/amalalogo.jpg'),
    //     "https://i.ibb.co/7nPcjFN/amalalogo.jpg",
    //     "https://i.ibb.co/ggh54M0/rtlogo.png",
    // require('../Asset/images/rtlogo.png'),
    // { width: 45, height: 45 },
    //     "https://i.ibb.co/dkNbcDN/jesconnewlogo.jpg"]
    // static licenseIp = "http://111.92.109.30:8082/licensedata/licensevalidation "
    // static headerfooter = ["http://his.amalaims.org:9292/labfile/getCommonFile/image/amalaheader.png",
    //     "http://his.amalaims.org:9292/labfile/getCommonFile/image/amalafooteredited.png"]
    // static asyncStorageAppKey = '@storage_KeyEMR';
    // static asyncStorageThemeKey = '@storage_KeyAppTheme';
}

// appcenter codepush release-react -a infoconnectionssoftwares/HOMESEMR -d JesconJWT
// :app:assembleRelease