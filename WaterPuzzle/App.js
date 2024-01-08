

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState } from 'react';

import WaterFlask from './components/WaterFlask';

function getTopMostColor(flaskColors){
  for (let i = 0; i < flaskColors.length; i++){
    if (flaskColors[i] != ""){
      return flaskColors[i]
    }
  }
  return ""
}


function getTopMostColorIndex(flaskColors) {
  for (let i = 0; i < flaskColors.length; i++) {
    if (flaskColors[i] != "") {
      return i
    }
  }
  return -1
  } 

function getLowestAvailableSpot(flaskColors) {
  for (let i = 3; i >= 0; i--){
    if (flaskColors[i] == "") {
      return i
    }
  }
  return -1
}

function hasSpace(colors) {
  if (colors[0] == ""){
    return true
  }
  return false
}

function isTransferrable(receiverFlask, giverFlask){
  const topColorReceiver = getTopMostColor(receiverFlask);
  const topColorGiver = getTopMostColor(giverFlask);
  if ((topColorReceiver == "") || 
        ((topColorGiver == topColorReceiver) && 
        (topColorGiver != "") && 
        hasSpace(receiverFlask))) {
    return true
  } else {
    return false
  }
}


export default function App() {
  const possibleColors = ["#EDD382", "#61185e", "#D72638", "#9882AC", "#C17817", "#2E6171", "#BAA898"]

  const initialColorConfigs = [["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"], ["#EDD382", "#61185e", "#D72638", "#9882AC"],
  ["#EDD382", "#61185e", "#D72638", "#9882AC"], ["", "", "", ""], ["", "", "", ""]]

  const [colorConfigs, setColorConfigs] = useState(initialColorConfigs);
  const [giverColor, setGiverColor] = useState("");
  const [selectedVialIndex, setSelectedVialIndex] = useState(-1)


  return (
    <View>
      <StatusBar />
      <FlatList 
        data={colorConfigs} 
        numColumns={5} 
        contentContainerStyle={styles.container}
      renderItem={( item ) => {
        const itemColors = item["item"] === undefined ? item: item["item"]
        return <TouchableHighlight  underlayColor={"beige"} 
        onPress = {(e) => {
          const currentVialIndex = item["index"]
          const sameVial = currentVialIndex == selectedVialIndex
          if (sameVial){
            setSelectedVialIndex(-1)
          } else if (selectedVialIndex != -1 && isTransferrable(item["item"], colorConfigs[selectedVialIndex])) {

            const transferredColor = getTopMostColor(giverColor)
            console.log("Transferred color: ", transferredColor, "giver color: ", giverColor, item['item'])
            newColorConfigs = colorConfigs.map((colorArray, index) => {
              if (selectedVialIndex == index) { //giver flask
                const topMostColorIndex = getTopMostColorIndex(colorArray)
                return colorArray.map((el, colorIndex) => {
                  if (colorIndex == topMostColorIndex) {
                    return ""
                  }
                  else {
                    return el
                  }
                })
              } else if (index == currentVialIndex) { //receiver flask
                const topMostColorIndex = getLowestAvailableSpot(colorArray)
                return colorArray.map((el, colorIndex) => {
                  console.log("Color index: ", colorIndex, "topmostColorIndex: ", topMostColorIndex, "transferred color: ", transferredColor)
                  if (colorIndex == (topMostColorIndex)){
                    console.log("Color Index: ", colorIndex, "returning: ", transferredColor)
                    return getTopMostColor(giverColor)
                  } else {
                    return el
                  }
                })
              } else {
                return [...colorArray]
              }
              })
            setColorConfigs(newColorConfigs)
            setSelectedVialIndex(-1)
          } else {
            setSelectedVialIndex(item["index"])
            setGiverColor(item["item"])

          }
          console.log("color configs: ", colorConfigs)
        }
        }>
          <WaterFlask 
                isSelected={selectedVialIndex == item["index"]} 
                colors={itemColors} 
              />

        </TouchableHighlight>
        
      }}
      keyExtractor={(item, index) => index} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "10",
    backgroundColor: 'beige',
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});
