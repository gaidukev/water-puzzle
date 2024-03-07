import React, { useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Image, Animated, Easing, useAnimatedValue} from 'react-native';

export default function WaterFlask({ isSelected, colors }){
    //const vialStyle = isSelected ? [styles.vial, styles.highlighted] : [styles.vial]
    const marginTopTest = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(marginTopTest, {
            toValue: isSelected ? 0 : 20,
            duration: 50,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isSelected])

    let img0 = colors[0] == "" ? "empty-middle" : colors[0] + "-middle"
    let img1 = colors[1] == "" ? "empty-middle" : colors[1] + "-middle"
    let img2 = colors[2] == "" ? "empty-middle" : colors[2] + "-middle"
    let img3 = colors[3] == "" ? "empty-bottom" : colors[3] + "-bottom"

    return(
        <Animated.View style={[{margin: 5}, {marginTop: marginTopTest}]}>        
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/flask-top.png`)} />
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/${img0}.png`)} />
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/${img1}.png`)} />
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/${img2}.png`)} />
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/${img3}.png`)} />
        </Animated.View>
    )

    
    // return(
    //     <Animated.View style={[styles.vial, {marginTop: marginTopTest}]} >
    //         {/* <Animated.View style={[styles.water, colors[0] != "" ? {backgroundColor: colors[0]} : {backgroundColor: null}]}/> */}
    //         <Animated.View style={[styles.water, colors[0] != "" ? {backgroundColor: colors[0]} : {backgroundColor: null}]}/> 
    //         <View style={[styles.water, colors[1] != "" ? {backgroundColor: colors[1]} : {backgroundColor: null}]}/>
    //         <View style={[styles.water, colors[2] != "" ? {backgroundColor: colors[2]} : {backgroundColor: null}]}/>
    //         <View style={[styles.water, colors[3] != "" ? {backgroundColor: colors[3]} : {backgroundColor: null}, styles.waterBottom]}/>
    //     </Animated.View>
    // )
}

const styles = StyleSheet.create({

    image: {
        height: 30,
        width: 50
    },
    
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