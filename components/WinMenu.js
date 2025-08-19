import { StyleSheet, View, Text, Image, Pressable, useWindowDimensions } from "react-native";
const menuHeight = 150;
const menuWidth = 250;

export default function WinMenu({ textStyles, onNext }) {

    const leftX = (useWindowDimensions().width - menuWidth) / 2
    const heightY = (useWindowDimensions().height - menuHeight) / 2


    return <View style={[styles.menu, {left: leftX, top: heightY}]}>
        <Text style={[textStyles, {fontSize: 30}]}>You won!</Text>
        <Pressable onPress={onNext}>
            <View style={styles.buttonViewStyle}>
                <Image 
                    style={styles.image}
                    source={require(`../assets/SettingsButtonBIG.png`)} />
                <Text style={[textStyles, styles.buttonText]}>Next Level</Text>
            </View>
        </Pressable>
    </View>    
}
const styles = StyleSheet.create({
    buttonText: {
        color: "white", 
        position: 'absolute',
        fontSize: 25
    },
    buttonViewStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    menu: {
        position: 'absolute',
        backgroundColor: 'white',
        width: menuWidth,
        height: menuHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: "#342c44"
    },
    image: {
        height: 25,
        width: 150
    }
})