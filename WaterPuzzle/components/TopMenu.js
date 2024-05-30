import React, { useEffect } from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';

export default function TopMenu({ onBackClick, onRestartClick}) {
    return <View style={{flexDirection: "row", justifyContent: "end", width: "auto", backgroundColor: "#ebf2ff"}}>
        <View style={{flexDirection: "row"}}>
            <Pressable onPress={onBackClick}>
                <Image source={require("../assets/Feb 21 2024 Back Arrow Pixel.png")}
                    style={{width:50, height: 50, resizeMode: "contain"}}/>
            </Pressable>
            <Pressable onPress={onRestartClick}>
                <Image source={require("../assets/Undo Arrow Pixel.png")} 
                    style={{width:50, height: 50, resizeMode: "contain"}}/>
            </Pressable>
        </View>
    </View>
}