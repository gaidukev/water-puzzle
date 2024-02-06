import React, { useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Animated, Easing} from 'react-native';

export default function WaterFlask({ isSelected, colors }){
    //const vialStyle = isSelected ? [styles.vial, styles.highlighted] : [styles.vial]
    const marginTopTest = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        console.log("Running effect!")
        Animated.timing(marginTopTest, {
            toValue: isSelected ? -20 : 0,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isSelected])
    
    return(
        <Animated.View style={[styles.vial, {marginTop: marginTopTest}]} >
            <View style={[styles.water, colors[0] != "" ? {backgroundColor: colors[0]} : {backgroundColor: null}]}/>
            <View style={[styles.water, colors[1] != "" ? {backgroundColor: colors[1]} : {backgroundColor: null}]}/>
            <View style={[styles.water, colors[2] != "" ? {backgroundColor: colors[2]} : {backgroundColor: null}]}/>
            <View style={[styles.water, colors[3] != "" ? {backgroundColor: colors[3]} : {backgroundColor: null}, styles.waterBottom]}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    
    waterBottom: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },

    water: {
        height: 30
    },

    highlighted: {
        marginTop: -10
    },

    vial: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        height: 150,
        width: 50,
        borderColor: "black",
        borderWidth: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    }
})