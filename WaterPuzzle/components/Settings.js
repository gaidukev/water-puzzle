import {  StyleSheet, Text, View, Button, Image } from 'react-native';
import { useFonts, VT323_400Regular} from "@expo-google-fonts/vt323";

export default function SettingsMenu({ textStyles }){

    return <View>
        <Text style={[textStyles, {fontSize: 30}]}>Mode:</Text>
        <Text style={[textStyles, {fontSize: 30}]}>&lt; Easy &gt;</Text>
        <Text style={[textStyles, {fontSize: 30}]}>Level: 72</Text>
    </View>
}

const styles = StyleSheet.create({
    text: {}
})