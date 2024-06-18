import React, { useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Image, Animated, Easing, useAnimatedValue} from 'react-native';
const images = {
    "#2E6171-bottom": require("../assets/flask-art/#2E6171-bottom.png"),
    "#2E6171-middle": require("../assets/flask-art/#2E6171-middle.png"),
    "#189ED8-bottom": require("../assets/flask-art/#189ED8-bottom.png"),
    "#189ED8-middle": require("../assets/flask-art/#189ED8-middle.png"),
    "#610B5D-bottom": require("../assets/flask-art/#610B5D-bottom.png"),
    "#610B5D-middle": require("../assets/flask-art/#610B5D-middle.png"),
    "#484541-bottom": require("../assets/flask-art/#484541-bottom.png"),
    "#484541-middle": require("../assets/flask-art/#484541-middle.png"),
    "#D21427-bottom": require("../assets/flask-art/#D21427-bottom.png"),
    "#D21427-middle": require("../assets/flask-art/#D21427-middle.png"),
    "#EF5D70-bottom": require("../assets/flask-art/#EF5D70-bottom.png"),
    "#EF5D70-middle": require("../assets/flask-art/#EF5D70-middle.png"),
    "#FF9200-bottom": require("../assets/flask-art/#FF9200-bottom.png"),
    "#FF9200-middle": require("../assets/flask-art/#FF9200-middle.png"),
    "#FFE593-bottom": require("../assets/flask-art/#FFE593-bottom.png"),
    "#FFE593-middle": require("../assets/flask-art/#FFE593-middle.png"),
    "empty-middle": require("../assets/flask-art/empty-middle.png"),
    "empty-bottom": require("../assets/flask-art/empty-bottom.png")
}


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
                source={images[img0]} />
            <Image 
                style={[styles.image]}
                source={images[img1]} />
            <Image 
                style={[styles.image]}
                source={images[img2]} />
            <Image 
                style={[styles.image]}
                source={images[img3]} />
        </Animated.View>
    )

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