import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View, Image, FlatList, TouchableHighlight, Pressable, Easing } from 'react-native';
import { useState } from 'react';
import { useFonts, VT323_400Regular} from "@expo-google-fonts/vt323";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';

import WaterFlask from './components/WaterFlask';
import TopMenu from './components/TopMenu';
import SettingsMenu from './components/Settings';

/**
 * 
 * @param {*} flaskColors 
 * @returns 
 */
function getTopMostColor(flaskColors){
  for (let i = 0; i < flaskColors.length; i++){
    if (flaskColors[i] != ""){
      return flaskColors[i]
    }
  }
  return ""
}

/**
 * 
 * @param {*} flaskColors 
 * @returns 
 */
function getTopMostColorIndex(flaskColors) {
  for (let i = 0; i < flaskColors.length; i++) {
    if (flaskColors[i] != "") {
      return i
    }
  }
  return -1
  } 

/**
 * 
 * @param {*} flaskColors 
 * @returns 
 */
function getLowestAvailableSpot(flaskColors) {
  for (let i = 3; i >= 0; i--){
    if (flaskColors[i] == "") {
      return i
    }
  }
  return -1
}

/**
 * 
 * @param {*} colors 
 * @returns 
 */
function hasSpace(colors) {
  if (colors[0] == ""){
    return true
  }
  return false
}

/**
 * 
 * @param {*} receiverFlask 
 * @param {*} giverFlask 
 * @returns 
 */
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

/**
 * 
 * @param {*} currentIndex 
 * @param {*} giverIndex 
 * @returns 
 */
function isGiverFlask(currentIndex, giverIndex){
  return currentIndex == giverIndex
}

/**
 * 
 * @param {*} currentIndex 
 * @param {*} receiverIndex 
 * @returns 
 */
function isReceiverFlask(currentIndex, receiverIndex){
  return receiverIndex == currentIndex
}

/**
 * 
 * @param {*} selectedVialIndex 
 * @param {*} currentItemContents 
 * @param {*} giverIndex 
 * @returns 
 */
function isValidTransfer(selectedVialIndex, currentItemContents, giverIndex){
  return selectedVialIndex != -1 && isTransferrable(currentItemContents, giverIndex)
}

/**
 * 
 * @param {*} colorArray 
 * @param {*} numberColorsTransferred 
 * @returns 
 */
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

/**
 * 
 * @param {*} currentIndex 
 * @param {*} lowestAvailable 
 * @param {*} numberColorsTransferred 
 * @returns 
 */
function satisfiesLow(currentIndex, lowestAvailable, numberColorsTransferred){
  return currentIndex <= lowestAvailable
}

/**
 * 
 * @param {*} currentIndex 
 * @param {*} lowestAvailable 
 * @param {*} numberColorsTransferred 
 * @returns 
 */
function satisfiesHigh(currentIndex, lowestAvailable, numberColorsTransferred){
  const upperBound = lowestAvailable - numberColorsTransferred + 1;
  return currentIndex >= upperBound;
}

/**
 * 
 * @param {*} colorArray 
 * @param {*} giverColor 
 * @param {*} numberColorsTransferred 
 * @returns 
 */
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


/**
 * 
 * @param {*} currentLevel 
 */
const setLevel = async (currentLevel) => {
  try {
    await AsyncStorage.setItem("current-level", currentLevel);
  } catch (e) {
    console.error(e)
  }
}

/**
 * 
 * @returns 
 */
const getLevel = async () => {
  try {
    const level = await AsyncStorage.getItem("current-level");
    return level
  } catch (e) {
    console.error(e)
  }
}

/**
 * 
 * @param {*} level 
 * @returns 
 */
function getLevelData(level) {
  return require("./levels/Level 0.json")
  //return require(`./levels/Level ${String(level)}.json`)

}

/**
 * 
 * @param {*} colors 
 * @returns 
 */
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

/**
 * 
 * @param {*} colors 
 * @returns 
 */
function countEmpty(colors){
  let count = 0;
  for (let i = 0; i < 4; i++){
    if (colors[i] == ""){
      count++;
    }
  }
  return count;
}

/**
 * 
 * @param {*} colorConfigs 
 * @returns 
 */
function checkWin(colorConfigs){
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

/**
 * Given the last move in moveHistory, undoMove will return a copy of colorConfigs where the last move has been
 * undone. 
 * @param {*} colorConfigs - 
 * @param {Array<Object>} moveHistory - array where each object is in form {giverIndex: Integer, receiverIndex: Integer} 
 */
function undoMove(colorConfigs, moveHistory){
  const lastMove = moveHistory[moveHistory.length - 1]
  const {giverIndex, receiverIndex, numberColorsTransferred} = lastMove
  const changedColor = getTopMostColor(colorConfigs[receiverIndex])
  const topReceiverIndex = getTopMostColorIndex(colorConfigs[receiverIndex])
  const bottomGiverIndex = getLowestAvailableSpot(colorConfigs[giverIndex])
  for (let i = 0; i < numberColorsTransferred; i++){
    colorConfigs[giverIndex][bottomGiverIndex - i] = changedColor;
    colorConfigs[receiverIndex][topReceiverIndex + i] = ""
  }


  const newConfigs = []
  for (let config of colorConfigs){
    newConfigs.push([...config])
  }
  return newConfigs
}

export default function App() {
  let [fontsLoaded] = useFonts({VT323_400Regular});

  const backgroundColor = "#ebf2ff"
  let currentLevel = getLevel()
  if (currentLevel == null) {
    currentLevel = 0
  }
  currentLevel = 0

  const initialColorConfigs = getLevelData(currentLevel)

  const [colorConfigs, setColorConfigs] = useState(initialColorConfigs);
  const [giverColor, setGiverColor] = useState("");
  const [selectedVialIndex, setSelectedVialIndex] = useState(-1);
  const [moveHistory, setMoveHistory] = useState([]);
  const [win, setWin] = useState(false);
  const [isSettingsView, setIsSettingsView] = useState(false);

  const height = useWindowDimensions().height / 2;
  const width = useWindowDimensions().width / 3;
  return (
    <View>
      <StatusBar />
      <TopMenu 
        onSettingsClick={(e) => {
          setIsSettingsView(!isSettingsView)
        }}
        onBackClick={(e) => {
          setColorConfigs(undoMove(colorConfigs, moveHistory))
          setMoveHistory([...moveHistory.slice(0, moveHistory.length - 1)])
        }} 
        onRestartClick={(e) => {
          setColorConfigs(initialColorConfigs)
          setMoveHistory([])
        }}/>
      {isSettingsView ? 
        <SettingsMenu 
          textStyles={styles.generalText} 
          onClosePress={(e) => setIsSettingsView(false)}/> : 
        <></>}
      <FlatList 
        data={colorConfigs} 
        numColumns={5} 
        contentContainerStyle={styles.container}
      renderItem={( item ) => {
        const itemColors = item["item"] === undefined ? item: item["item"]
        return <Pressable  underlayColor={backgroundColor} 
        onPress = {(e) => { if(!win & !isSettingsView) {
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
            setMoveHistory([...moveHistory, {giverIndex: selectedVialIndex, receiverIndex: currentVialIndex, numberColorsTransferred: numberColorsTransferred}])
          } else {
            setSelectedVialIndex(item["index"])
            setGiverColor(item["item"])
          }}
        }

          }>
          <WaterFlask 
                isSelected={selectedVialIndex == item["index"]} 
                colors={itemColors} 
              />

        </Pressable>

  
        
      }}
      keyExtractor={(item, index) => index} />
      {win ? (<Text style={[styles.winText, styles.generalText, {top: height, left: width}]}>You Won!</Text>) : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  generalText: {
    color: "#472836",
    fontFamily: 'VT323_400Regular'
  },
  winText: {
    position: "absolute",
    fontSize: "55px"
  },

  container: {
    margin: "10",
    backgroundColor: '#ebf2ff',
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});
