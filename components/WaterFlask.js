import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
const images = {
    "#2E6171-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#2E6171-middle": require("../assets/flask-art/middle-mask.png"),
    "#189ED8-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#189ED8-middle": require("../assets/flask-art/middle-mask.png"),
    "#610B5D-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#610B5D-middle": require("../assets/flask-art/middle-mask.png"),
    "#484541-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#484541-middle": require("../assets/flask-art/middle-mask.png"),
    "#D21427-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#D21427-middle": require("../assets/flask-art/middle-mask.png"),
    "#EF5D70-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#EF5D70-middle": require("../assets/flask-art/middle-mask.png"),
    "#FF9200-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#FF9200-middle": require("../assets/flask-art/middle-mask.png"),
    "#FFE593-bottom": require("../assets/flask-art/bottom-mask.png"),
    "#FFE593-middle": require("../assets/flask-art/middle-mask.png"),
    "empty-middle": require("../assets/flask-art/empty-middle.png"),
    "empty-bottom": require("../assets/flask-art/empty-bottom.png")
}

const animationFrames = [require("../assets/flask-art/flask-middle-tap-animation/frame_0.png"), 
    require("../assets/flask-art/flask-middle-tap-animation/frame_1.png"), 
    require("../assets/flask-art/flask-middle-tap-animation/frame_2.png"),
    require("../assets/flask-art/flask-middle-tap-animation/frame_3.png"),
    require("../assets/flask-art/flask-middle-tap-animation/frame_4.png"),
    require("../assets/flask-art/flask-middle-tap-animation/frame_5.png"), 
    require("../assets/flask-art/flask-middle-tap-animation/frame_6.png"), 
    require("../assets/flask-art/flask-middle-tap-animation/frame_7.png")]



export default function WaterFlask({ isSelected, colors }){
    const [currentFrame, setCurrentFrame] = useState(null);
    const flaskAnimation = useRef(new Animated.Value(0)).current;

    const lowestColorIndex = colors.findIndex(color => color != null && color != "" && color != undefined);


    useEffect(() => {
        Animated.timing(flaskAnimation, {
            toValue: isSelected ? 0 : 20,
            duration: 50,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();

        let frame = 0;
        setCurrentFrame(0);
        if (!isSelected) return;
            
        const id = setInterval(() => {
            frame++;

            if (frame >= animationFrames.length ) 
            {
                clearInterval(id);
                setCurrentFrame(null);
            } else {
                setCurrentFrame((frame) % animationFrames.length);
            }
        }, 30);
    }, [isSelected])

    let img0 = colors[0] + "-middle"
    let img1 = colors[1] + "-middle"
    let img2 = colors[2] + "-middle"
    let img3 = colors[3] + "-bottom"

    return(
        <Animated.View style={[{margin: 5}, {marginTop: flaskAnimation}]}>        
            <Image 
                style={[styles.image]}
                source={require(`../assets/flask-art/flask-top.png`)} />
            <View style={[styles.hide]}>
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[0]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[1]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[2]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[3]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[4]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[5]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[6]} />
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={animationFrames[7]} />
            </View>
            <View style={[styles.flaskSlot]}>
                {colors[0] &&                 
                    <Image 
                        style={[styles.image, StyleSheet.absoluteFill, styles.imageSize, {tintColor: colors[0]}]}
                        source={currentFrame && lowestColorIndex == 0 ? animationFrames[currentFrame] : images[img0]} />
                }
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={images["empty-middle"]} />
            </View>
            <View style={[styles.flaskSlot]}>
                {colors[1] && 
                    <Image 
                        style={[styles.image, StyleSheet.absoluteFill, styles.imageSize, {tintColor: colors[1]}]}
                        source={currentFrame && lowestColorIndex == 1 ? animationFrames[currentFrame] : images[img1]} />
                }
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={images["empty-middle"]} />
            </View>
            <View style={[styles.flaskSlot]}>
                {colors[2] &&
                    <Image 
                        style={[styles.image, StyleSheet.absoluteFill, styles.imageSize, {tintColor: colors[2]}]}
                        source={currentFrame && lowestColorIndex == 2 ? animationFrames[currentFrame] : images[img2]} />
                }
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={images["empty-middle"]} />
            </View>
            <View style={[styles.flaskSlot]}>
                {colors[3] &&
                    <Image 
                        style={[styles.image, StyleSheet.absoluteFill, styles.imageSize, {tintColor: colors[3]}]}
                        source={images[img3]} />
                }
                <Image 
                    style={[styles.image, StyleSheet.absoluteFill]}
                    source={images["empty-bottom"]} />
            </View>
        </Animated.View>
    )

}

const styles = StyleSheet.create({

    hide: {
        display: "none"
    },

    flaskSlot: {
        height: 30,
        width: 50,
        position: "relative"
    },

    image: {
        resizeMode: "cover"
    },

    imageSize: {
        height: 31,
        width: 51
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