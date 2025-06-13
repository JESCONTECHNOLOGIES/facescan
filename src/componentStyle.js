import { StyleSheet, Dimensions, Platform, PixelRatio, Text } from "react-native";
import { colors, fontWeight } from "./commonStyle";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;
var radio_height = 20
export function normalize(size) {
  const newSize = scale < 1.5 ? size * scale : size * 1.6
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export function width(itemwidth) {
  return SCREEN_WIDTH * (itemwidth / 100)
}

export function height(itemheight) {
  return SCREEN_HEIGHT * (itemheight / 100)
}

const ComponentStyles = StyleSheet.create({
  textinput: {
    fontSize: normalize(15),
    color: colors.color_componentText,
    // ...ComponentStyles.input_Text,
    width: width(20),
    marginLeft: '1%',
    marginRight: '1%',
    padding: 0,
    height: SCREEN_HEIGHT * 0.03,
    marginBottom: height(3),
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    borderWidth: 1,
    marginVertical:5,
    borderColor:'lightgrey'
  },
  viewstyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // width: width(10)
  },
  textstyle: {
    fontSize: normalize(10),
    // width : '50%'
  },
  headerTitle: {
    fontSize: normalize(13), color: '#fff', fontWeight: fontWeight.fontWeight_Normal
  },
  headerSubTitle: {
    fontSize: normalize(11), color: '#fff', fontWeight: fontWeight.fontWeight_Normal
  },

  component_Icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  group_Button: {
    width: 22, height: 22,
    justifyContent: 'center'
  },
  group_Button_BadgeStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 0.7,
    borderRadius: 100,
    borderWidth: 1, borderColor: 'gray',

  },
  media_Gallery_Container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  group_Button_Badge_TextStyle: {
    color: colors.color_StatusBar,
    fontSize: 10, fontWeight: 'bold',

  },
  group_Button_Badge_ContainerStyle: {
    position: 'absolute', top: -3, left: -5
  },
  no_data_found_text: {
    fontSize: normalize(12),
    color: colors.color_componentText,
    fontWeight: '800', alignItems: 'center', justifyContent: 'center'
  },
  //footer
  footer_Icon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.9,
  },

  footer_Icon_Text: {
    textAlign: 'center',
    fontSize: normalize(6),
  },
  //Header style
  header_section_conatiner_style: {

    backgroundColor: colors.color_Header,
    justifyContent: 'flex-end',
    padding: 10
  },
  header_section_child_container_style: {
    flexDirection: 'row', justifyContent: 'space-between',
    margin: 1, alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? '6%' : '3%',
  },
  header_left_menu_icon_container: {
    // backgroundColor: '#F9AA33', 
    borderColor: '#000',
    borderRadius: 5, borderWidth: 0.8, justifyContent: 'center',
  },
  header_right_menu_icon_container: {
    borderColor: '#000',
    borderRadius: 5,
    justifyContent: 'center'
  },
  header_menu_icon: {
    height: 27, width: 27, margin: 5,
  },
  // Result Report (ResultView, ResultViewDateWise, )
  result_view_child_container: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', borderBottomWidth: 1,
    borderColor: colors.color_componentBordercolor,
    width: '100%',

  },
  result_view_heading_container: {
    width: '19%', marginLeft: '1%',

  },
  result_view_display_Text: {
    fontSize: normalize(12),
    color: colors.color_componentText,
    fontWeight: '800'
  },
  result_view_viewgraph_container: {
    marginTop: '1%'
  },
  result_view_viewgraph_text: {
    color: '#943126', fontStyle: 'italic',
  },
  result_view_range_container: {
    width: '9%', alignItems: 'flex-start',
  },
  result_view_unit_Text: {
    fontSize: normalize(10),
    color: "black",//"#606266",
    fontWeight: "bold"
  },
  result_view_range_child_container: {
    width: '100%', flexDirection: 'column',
    marginTop: '1%', alignItems: 'center',
  },
  result_view_range_Text: {
    fontSize: normalize(10),
    color: "#4D5656",//"#606266",
    fontWeight: 'normal',
  },
  result_view_value_container: {
    width: '68%', marginLeft: '1%',
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderColor: colors.color_componentBordercolor,
  },
  profilecard_dataContainer: {
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    padding: 1
  },
  profilecard_left: {
    width: '5%',
    backgroundColor: 'yellow'
    // width: orientation.portrait ? width * 0.35 : width * 0.30,
  },
  profilecard_right: {
    flex: 1, justifyContent: 'flex-start', paddingLeft: 10, paddingTop: 0
    // alignItems: 'center',
  },
  profilecard_end_view: {
    width: '25%',
    alignItems: 'flex-end',
    // alignItems: 'center', justifyContent: 'center',
    borderRadius: 10,
  },
  profilecard_end_child_view: {
    height: 75,
    justifyContent: 'space-around', width: '100%', alignItems: 'center'
  },
  profilecard_end_button: {
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').height * 0.04,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilecard_end_button_icon: {
    width: '100%', height: '100%', resizeMode: 'contain',
  },
  profilecard_content_left: {
    justifyContent: 'space-around', alignItems: 'center'
  },
  profilecard_content_right: {
    width: '90%',
    justifyContent: 'flex-end', alignItems: 'center'
  },
  profilecard_image: {
    height: normalize(50), width: '100%', resizeMode: 'contain'

  },
  profilecard_profilecontent_heading1: {
    fontSize: normalize(13),
    fontWeight: 'normal',
    color: colors.color_profilecard_heading1,

  },
  profilecard_profilecontent_heading2: {
    fontSize: normalize(17),
    fontWeight: 'bold',
    color: colors.color_profilecard_heading2,

  },
  profilecard_onlinestatus_badgecontainer: {
    position: 'absolute',
    top: normalize(5),
    right: normalize(8),
  },
  profilecard_subheading_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',

  },
  profilecard_subheading_left_container: {
    width: '50%',
    justifyContent: 'flex-end', alignItems: 'flex-end',

  },
  profilecard_subheading_right_container: {
    // width: orientation.portrait ? width * 0.28 : width * 0.27,
    width: '49%',
    paddingLeft: '1%',

  },
  profilecard_hiddenitem_container: {
    flexDirection: 'row',
    width: '100%',
    height: normalize(60),
    marginVertical: normalize(2),
    alignItems:'center',
    justifyContent: 'space-evenly',
  },
  profilecard_hiddenitem_Child_container: {
    width: '70%',
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  profilecard_hiddenitem_inner_container: {
    width: '100%'
  },
  profilecard_hiddenitem_left_displaytext: {
    marginTop: 1, marginLeft: 5,
    textAlign: 'left', fontSize: normalize(8),
    fontWeight: 'bold',
    color: "#606266",
  },
  profilecard_hiddenitem_left_displayvalue: {
    marginTop: 1, marginLeft: 12,
    textAlign: 'left', fontSize: normalize(10),
    fontWeight: 'bold',
    color: "#0C4F60",
  },
  profilecard_hiddenitem_right_displaytext: {
    marginTop: 0, marginRight: 5,
    textAlign: 'right', fontSize: normalize(8),
    fontWeight: 'bold',
    color: "#606266",
  },
  profilecard_hiddenitem_right_displayvalue: {
    marginTop: 1, marginRight: 12, textAlign: 'right', fontSize: normalize(10),
    fontWeight: 'bold',
    color: "#0C4F60",
  },
  doctorText: {
    fontSize: normalize(16),
    fontWeight: 'bold'
  },

  input_Text: {
    fontSize: normalize(14),
    color: colors.color_componentText
  },
  select_TextStyle: {
    alignContent: 'center',
    margin: Dimensions.get("window").height * 0.004,
    alignItems: 'center',
    textAlign: 'left',
    fontSize: normalize(14),
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10
  },
  buttonText: {
    fontSize: normalize(20),
    color: colors.color_buttonText
  },
  label_underIcon: {
    fontSize: normalize(6)
  },
  item_TitleLabel: {
    fontSize: normalize(10),
    color: colors.color_dark_grey,
    // fontWeight:fontWeight.fontWeight_600
    // padding:5,
    // paddingBottom:0,
  },
  item_DOB: {
    fontSize: normalize(10),
    fontWeight: 'bold'
    // color: colors.color_dark_grey,
    // fontWeight:fontWeight.fontWeight_600
    // padding:5,
    // paddingBottom:0,
  },
  view_Display_Text: {
    // justifyContent: 'center',
    width: '100%',
    // paddingLeft: Dimensions.get("window").width * 0.005
  },

  radioContainer: {
    flexGrow: 1,
    flexDirection: "row",
    width:'20%',
    // padding: 10
    // paddingRight:20,
    paddingVertical: 5,
  },
  outerRadioButton: {
    alignItems: "center",
    justifyContent: "center",
    height: radio_height,
    width: radio_height,
    borderRadius: radio_height / 2,
    borderWidth: 1,
  },
  radioButtonText: {
    fontSize: normalize(11),
  },
  innerRadioButton: {
    height: radio_height / 1.3,
    width: radio_height / 1.3,
    borderRadius: radio_height / 2,
    backgroundColor: 'darkblue'
  },

  //alignment//
  View_row_center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  View_row_flexstart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  View_row_flexend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  View_row_spacearound: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  View_col_spacearound: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  View_col_center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  View_col_flexstart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  View_col_flexend: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },

  //alignment ends here//
  mediaoverlay_containerstyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    // backgroundColor:'rgba(0,0,0,0)',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    justifyContent: 'flex-end',
    // height:Dimensions.get("window").height ,
    flex: 1
  },
  mediaoverlay_childrenwrapperstyle: {
    // width:Dimensions.get("window").width,
    // backgroundColor:'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height:Dimensions.get("window").height*0.30,
    // padding:Dimensions.get("window").height*0.01,
    marginBottom: 0,
  },
  mediaoverlay_topline: {
    height: Dimensions.get("window").height * 0.003,
    backgroundColor: colors.color_button,
    width: Dimensions.get("window").width * 0.10
  },
  mediaoverlay_icon: {
    width: 35, height: 35, justifyContent: 'center', resizeMode: 'contain'
  },
  popup_containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  popup_heading: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    paddingLeft: Dimensions.get("window").width * 0.02,
    color: colors.color_PopupHeadingText,
  },
  mediaoverlay_iconundertext: {
    fontSize: normalize(8)
  },
  alertHttpstatusText: {
    fontSize: normalize(12),
    color: colors.color_dark_grey,
    fontWeight: fontWeight.fontWeight_Bold
  },
  alertCaptionText: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: normalize(15),
    color: colors.color_alertCaptionText
  },
  alertMessageText: {
    fontSize: normalize(12),
    color: colors.color_dark_grey,
    fontWeight: fontWeight.fontWeight_Bold,
    textAlign: 'justify'
  },
  alertContentText: {
    fontSize: normalize(10),
    color: 'red',
    fontWeight: 'bold',
    textAlign: "center",
    textAlign: 'justify'
  },
  errorMoreButton: {
    fontSize: normalize(10),
    color: colors.color_errorMoreButton,
    fontWeight: 'bold',
    textAlign: "center"
  },

  searchTextbox_View: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: colors.color_componentBordercolor,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 7,
    // margin: Dimensions.get("window").height * 0.002,
    marginBottom: Dimensions.get("window").height * 0.003,
    height: 35,
    // width:'100%',
    backgroundColor: '#f1f3f6',
    // backgroundColor:colors.color_componentBgcolor,
    marginTop: 0,padding:5
  },
  searchTextbox: {
    color: "black",
    width: '100%', marginLeft: '1%', marginRight: '1%',
    fontWeight:'bold',
    fontSize: normalize(18),
    textAlign: 'justify',
    padding: 0, height: '100%', marginBottom: -(Dimensions.get("window").height * 0.003)
  },
  searchIcon: {
    width: 20, height: 20, margin: 5, resizeMode: 'contain',
  },
  searchButton: {
    height: 35,
    width: '20%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  searchButtonText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    color: colors.color_buttonText,
    padding: 1,
  },
  errorMsgText: {
    color: colors.color_error_msg_Text
  }
})
export default ComponentStyles;