import {  StyleSheet, Text, View, Image, Pressable, useWindowDimensions } from 'react-native';
import { useFonts, VT323_400Regular} from "@expo-google-fonts/vt323";

export default function SettingsMenu({ textStyles, onClosePress, mode, level, onModeLessPress, onModeMorePress }){

    const leftX = (useWindowDimensions().width - 250) / 2 
    return <View style={[styles.menuStyle, {left: leftX}]}>
        <Text style={[textStyles]}>Mode:</Text>
        <View style={styles.modeViewStyle}>
            <Pressable onPress={onModeLessPress}>
                <Text style={[textStyles]}>&lt;</Text>
            </Pressable>
            <Text style={[textStyles]}>{mode[0] + mode.slice(1).toLowerCase()}</Text>
            <Pressable onPress={onModeMorePress}>
                <Text style={[textStyles]}>&gt;</Text>
            </Pressable>
        </View>
        <Text style={[textStyles]}>Level: {level.toString()}</Text>
        <Pressable onPress={onClosePress}>
            <View style={styles.buttonViewStyle}>
                <Image 
                    style={[styles.image]}
                    source={require(`../assets/SettingsButton.png`)} />
                <Text style={[textStyles, styles.buttonText]}>Close</Text>

            </View>

        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    modeViewStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonViewStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },

    menuStyle: {
        position: 'absolute',
        width: 250,
        height: 150,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        borderWidth: 5,
        top: 40
    },

    settingsText: {
        fontSize: 30
    },

    buttonText: {
        position: 'absolute',
        color: 'white'
    },

    image: {
        height: 25,
        width: 90
    }})