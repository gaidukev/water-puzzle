import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




export default function WaterFlask({ isSelected, colors }){
    console.log("Colors: ", colors)
    console.log("Selected: ", isSelected)
    colors = colors.item;

    const vialStyle = isSelected ? [styles.vial, styles.highlighted] : [styles.vial]
    return(
        <View style={vialStyle} >
            <View style={[styles.water, {backgroundColor: colors[0]}]}/>
            <View style={[styles.water, {backgroundColor: colors[1]}]}/>
            <View style={[styles.water, {backgroundColor: colors[2]}]}/>
            <View style={[styles.water, {backgroundColor: colors[3]}, styles.waterBottom]}/>
        </View>
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