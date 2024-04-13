import {  StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useFonts, VT323_400Regular} from "@expo-google-fonts/vt323";

export default function SettingsMenu({ textStyles, onClosePress }){

    return <View style={styles.menuStyle}>
        <Text style={[textStyles, styles.settingsText]}>Mode:</Text>
        <View style={styles.modeViewStyle}>
            <Text style={[textStyles, styles.settingsText]}>&lt;</Text>
            <Text style={[textStyles, styles.settingsText]}>Easy</Text>
            <Text style={[textStyles, styles.settingsText]}>&gt;</Text>
        </View>
        <Text style={[textStyles, styles.settingsText]}>Level: 72</Text>
        <Pressable onPress={onClosePress}>
            <View style={styles.buttonViewStyle}>
                <Image 
                    style={[styles.image]}
                    source={require(`../assets/SettingsButton.png`)} />
                <Text style={[textStyles, styles.buttonText, styles.settingsText]}>Close</Text>

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
        display: 'flex',
        alignItems: 'center'
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