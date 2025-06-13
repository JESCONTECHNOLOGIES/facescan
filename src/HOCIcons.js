import React, { memo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Zocial from 'react-native-vector-icons/Zocial'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

 function Icons(props) {

    const components = {
         1: AntDesign,
         2: MaterialIcons,
         3: MaterialCommunityIcons,
         4: FontAwesome,
         5: FontAwesome5,
         6: Foundation,
         7: EvilIcons,
         8: Ionicons,
         9: Octicons,
        10: Feather,
        11: Entypo,
        12: Zocial,
        13: Fontisto,
        14: SimpleLineIcons
    };

    const HOCIconComponent =  props.icongroup != null && props.icongroup != undefined &&
    typeof props.icongroup != "boolean" && !isNaN(props.icongroup) && props.icongroup > 0 &&
    props.icongroup < 15 ? components[props.icongroup] : components[5];
    
    return (
        <HOCIconComponent
            {...props}
        />
    );
}
/**
    * to use HOC <HOCIcons.Icons
    * Pass icongroup as an integer ex: icongroup={3}
    * @param 1 AntDesign.
    * @param 2 MaterialIcons.
    * @param 3 MaterialCommunityIcons.
    * @param 4 FontAwesome.
    * @param 5 FontAwesome5.
    * @param 6 Foundation.
    * @param 7 EvilIcons.
    * @param 8 Ionicons.
    * @param 9 Octicons.
    * @param 10 Feather.
    * @param 11 Entypo.
    * @param 12 Zocial.
    * @param 13 Fontisto.
    * @param 14 SimpleLineIcons.
 */
export default {
    Icons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome,
    Foundation,
    Fontisto,
    EvilIcons,
    Ionicons,
    Octicons,
    Feather,
    Entypo,
    Zocial,
    FontAwesome5,
    AntDesign
};