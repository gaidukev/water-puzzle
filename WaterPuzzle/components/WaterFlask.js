import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function WaterFlask({ colors }){
    console.log("Colors: ", colors)
    colors = colors.item;
    return(
        <View style={styles.vial}>
            <View style={[styles.water, {backgroundColor: colors[0]}]}/>
            <View style={[styles.water, {backgroundColor: colors[1]}]}/>
            <View style={[styles.water, {backgroundColor: colors[2]}]}/>
            <View style={[styles.water, {backgroundColor: colors[3]}, styles.waterBottom]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    
    waterBottom: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },

    water: {
        height: 40
    },

    vial: {
        paddingTop: 30,
        height: 200,
        width: 70,
        borderColor: "black",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    }
})