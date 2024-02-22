import React, { useEffect } from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';

export default function TopMenu({ onBackClick, onRestartClick}) {
    return <View style={{flexDirection: "row", justifyContent: "flex-end", width: "auto", backgroundColor: "beige"}}>
        <Pressable onPress={onBackClick}>
            <Image source={require("../assets/feb-19-back-arrow.png")}
                style={{width:50, height: 50, resizeMode: "contain"}}/>
        </Pressable>
        <Pressable onPress={onRestartClick}>
            <Image source={require("../assets/feb-19-restart-arrow.png")} 
                style={{width:50, height: 50, resizeMode: "contain"}}/>
        </Pressable>
    </View>
}