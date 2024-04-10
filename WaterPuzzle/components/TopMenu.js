import React, { useEffect } from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';

export default function TopMenu({ onSettingsClick, onBackClick, onRestartClick}) {
    return <View style={{flexDirection: "row", justifyContent: "space-between", width: "auto", backgroundColor: "#ebf2ff"}}>
        <Pressable onPress={onSettingsClick}>
            <Image source={require("../assets/gear arrow pixel.png")}
                style={{width: 50, height: 50, resizeMode: "contain"}}/>
        </Pressable>
        <View style={{flexDirection: "row"}}>
            <Pressable onPress={onBackClick}>
                {/* //<Image source={require("../assets/feb-19-back-arrow.png")} */}
                <Image source={require("../assets/Feb 21 2024 Back Arrow Pixel.png")}
                    style={{width:50, height: 50, resizeMode: "contain"}}/>
            </Pressable>
            <Pressable onPress={onRestartClick}>
                <Image source={require("../assets/Undo Arrow Pixel.png")} 
            // <Image source={require("../assets/feb-19-restart-arrow.png")} 
                    style={{width:50, height: 50, resizeMode: "contain"}}/>
            </Pressable>
        </View>
    </View>
}