import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

function isGiverFlask(currentIndex, giverIndex){
  return currentIndex == giverIndex
}

function isReceiverFlask(currentIndex, receiverIndex){
  return receiverIndex == currentIndex
}

function isValidTransfer(selectedVialIndex, currentItemContents, giverIndex){
  return selectedVialIndex != -1 && isTransferrable(currentItemContents, giverIndex)
}

function getGiverBeakerColors(colorArray, numberColorsTransferred){
  const topMostColorIndex = getTopMostColorIndex(colorArray)

  return colorArray.map((el, colorIndex) => {
    if (colorIndex == topMostColorIndex || colorIndex < (topMostColorIndex + numberColorsTransferred)) {
      return ""
    }
    else {
      return el
    }
  })
}

function satisfiesLow(currentIndex, lowestAvailable, numberColorsTransferred){
  return currentIndex <= lowestAvailable
}

function satisfiesHigh(currentIndex, lowestAvailable, numberColorsTransferred){
  const upperBound = lowestAvailable - numberColorsTransferred + 1;
  return currentIndex >= upperBound;
}

function getReceiverBeakerColors(colorArray, giverColor, numberColorsTransferred){
  const lowestAvailableSpotIndex = getLowestAvailableSpot(colorArray)
  return colorArray.map((el, colorIndex) => {
    if (satisfiesLow(colorIndex, lowestAvailableSpotIndex, numberColorsTransferred) && satisfiesHigh(colorIndex, lowestAvailableSpotIndex, numberColorsTransferred)){
      return getTopMostColor(giverColor)
    } else {
      return el
    }
  })
}



const setLevel = async (currentLevel) => {
  try {
    await AsyncStorage.setItem("current-level", currentLevel);
  } catch (e) {
    console.error(e)
  }
}

const getLevel = async () => {
  try {
    const level = await AsyncStorage.getItem("current-level");
    return level
  } catch (e) {
    console.error(e)
  }
}

function getLevelData(level) {
  return require(`./levels/Level ${String(level)}.json`)

}

function countTopColor(colors){
  let topColor; 
  let finished = false;
  let count = 0;
  for (let i = 0; i < 4; i++){
    if (colors[i] != "" && topColor === undefined) {
      topColor = colors[i]
      count++;
    } else if (colors[i] == topColor && (!finished)){
      count++
    } else if (colors[i] != topColor && !finished && topColor != undefined){
      finished = true
    }
  }
  return count;
}

function countEmpty(colors){
  let count = 0;
  for (let i = 0; i < 4; i++){
    if (colors[i] == ""){
      count++;
    }
  }
  return count;
}

function checkWin(colorConfigs){
  console.log("Checking win: ", colorConfigs)
  for(let config of colorConfigs){
    const topElement = config[0]
    for (let i = 1; i < 4; i++){
      if(config[i] != topElement){
        return false
      }
    }
  }
  return true
}

export default function App() {
  let currentLevel = getLevel()
  if (currentLevel == null) {
    currentLevel = 0
  }
  currentLevel = 0

  const initialColorConfigs = getLevelData(currentLevel)

  const [colorConfigs, setColorConfigs] = useState(initialColorConfigs);
  const [giverColor, setGiverColor] = useState("");
  const [selectedVialIndex, setSelectedVialIndex] = useState(-1)
  const [win, setWin] = useState(false)

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
        onPress = {(e) => { if(!win) {
          if(!win){
          const currentVialIndex = item["index"]
          const sameVial = currentVialIndex == selectedVialIndex
          if (sameVial){
            setSelectedVialIndex(-1)
          } else if (isValidTransfer(selectedVialIndex, item["item"], colorConfigs[selectedVialIndex])) {

            const countOfTopColorGiver = countTopColor(giverColor);
            const countOfTopEmptyReceiver = countEmpty(itemColors);

            const numberColorsTransferred = Math.min(countOfTopColorGiver, countOfTopEmptyReceiver)

            let newColorConfigs = colorConfigs.map((colorArray, index) => {
              if (isGiverFlask(index, selectedVialIndex)) {
                return getGiverBeakerColors(colorArray, numberColorsTransferred)

              } else if (isReceiverFlask(index, currentVialIndex)) {
                return getReceiverBeakerColors(colorArray, giverColor, numberColorsTransferred)
                
              } else {
                return [...colorArray]
              }
              })
            setColorConfigs(newColorConfigs)
            setWin(checkWin(newColorConfigs))
            setSelectedVialIndex(-1)
          } else {
            setSelectedVialIndex(item["index"])
            setGiverColor(item["item"])
          }}}
        }

          }>
          <WaterFlask 
                isSelected={selectedVialIndex == item["index"]} 
                colors={itemColors} 
              />

        </TouchableHighlight>

  
        
      }}
      keyExtractor={(item, index) => index} />
      {win ? (<Text>"You Won!!!!"</Text>) : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  winText: {
    position: "absolute",
    fontSize: "100",
    color: "red",
    position: "10"
  },

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
