import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Levels from "../Levels.json";
const memoryKey = "level"

import TopMenu from '../components/TopMenu';
import WaterFlask from '../components/WaterFlask';
import WinMenu from '../components/WinMenu';

export default function Index() {

  /** 
   * Returns the topmost color of a flask, if any, ignoring empty spaces.
   * 
   * @param {Array<string>} flaskColors: an array containing the colors of a beaker
   * @returns string representing the topmost color
  */
  function getTopMostColor(flaskColors:Array<string>): string{
    for (let i = 0; i < flaskColors.length; i++){
      if (flaskColors[i] != ""){
        return flaskColors[i]
      }
    }
    return ""
  }

  /**
   * Returns the index of the topmost color of a flask, if any. If the flask is empty, returns -1.
   * @param {Array<string>} flaskColors: an array containing the colors of a beaker
   * @returns integer representing the position within the flask of the topmost color
   */
  function getTopMostColorIndex(flaskColors:Array<string>): number {
    for (let i = 0; i < flaskColors.length; i++) {
      if (flaskColors[i] != "") {
        return i
      }
    }
  return -1
  } 

  /**
   * 
   * @param {Array<string>} flaskColors: an array containing the colors of a beaker
   * @returns integer representing the lowest empty index within the flask, or -1 if the flask is full
   */
  function getLowestAvailableSpot(flaskColors:Array<string>): number {
    for (let i = 3; i >= 0; i--){
      if (flaskColors[i] == "") {
        return i
      }
    }
    return -1
  }

  /**
   * 
   * @param {Array<string>} colors: internal representation of a flask
   * @returns boolean, false if the flask is full and true otherwise
   */
  function hasSpace(colors:Array<string>): boolean {
    if (colors[0] == ""){
      return true
    }
    return false
  }

  /**
   * 
   * @param {Array<string>} receiverFlask: flask where water would be transferred 
   * @param {Array<string>} giverFlask: flask that would be giving up some of its water to the receiver 
   * @returns boolean, true if receiver can accept water from the giver. 
   * 
   * Conditions must be satisfied, such as: 
   * - receiver isn't full
   * - giver isn't empty
   * - their topmost colors match
   */
  function isTransferrable(receiverFlask:Array<string>, giverFlask:Array<string>): boolean{
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
   * @param {number} currentIndex index of a flask from an array
   * @param {number} giverIndex index of the giver flask
   * @returns true if their indeces match, false otherwise
   */
  function isGiverFlask(currentIndex:number, giverIndex:number): boolean{
    return currentIndex == giverIndex
  }
  
  /**
   * 
   * @param {number} currentIndex index of a flask from an array
   * @param {number} receiverIndex index of the receiver flask
   * @returns true if their indeces match, false otherwise
   */
  function isReceiverFlask(currentIndex:number, receiverIndex:number): boolean{
    return receiverIndex == currentIndex
  }
  
  /**
   * 
   * @param {number} selectedVialIndex the index of the selected flask 
   * @param {Array<string>} currentItemContents the contents of the receiver flask
   * @param {Array<string>} giverIndex: the contents of the giver flask
   * @returns true if the water can be transferred from the giver to the receiver, false otherwise
   */
  function isValidTransfer(selectedVialIndex:number, currentItemContents:Array<string>, giverIndex:Array<string>): boolean{
    return selectedVialIndex != -1 && isTransferrable(currentItemContents, giverIndex)
  }

  /**
   * 
   * @param {Array<string>} colorArray contents of the giver flask pre-transfer
   * @param {number} numberColorsTransferred the amount of water that was poured from the giver to the receiver
   * @returns {Array<string>} contents of the giver flask post-transfer, removing the topmost water, depending on numberColorsTransferred 
   */
  function getGiverBeakerColors(colorArray:Array<string>, numberColorsTransferred:number): Array<string>{
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
   * @param {number} currentIndex The index of the current color slot
   * @param {number} lowestAvailable The index of the lowest available color slot
   * @param {number} numberColorsTransferred the amount of water slots (1-4) given from the giver to the receiver
   * @returns {boolean} true if currentIndex is less than lowestAvailable
   */
  function satisfiesLow(currentIndex:number, lowestAvailable:number, numberColorsTransferred:number): boolean{
    return currentIndex <= lowestAvailable
  }

  /**
   * 
   * @param {number} currentIndex the index of the current color slot
   * @param {number} lowestAvailable the index of the lowest available color slot
   * @param {number} numberColorsTransferred the amount of water slots (1-4) given from the giver to the receiver
   * @returns {boolean} true if the currentIndex is greater than the upper bound 
   */
  function satisfiesHigh(currentIndex:number, lowestAvailable:number, numberColorsTransferred:number){
    const upperBound = lowestAvailable - numberColorsTransferred + 1;
    return currentIndex >= upperBound;
  }

  
  /**
   * 
   * @param {Array<string>} colorArray the contents of the receiver
   * @param {string} giverColor the color that will be getting poured into the receiver
   * @param {number} numberColorsTransferred the number of colors the receiver beaker will be receiving
   * @returns {Array<string>} the colors in the receiver beaker after the transfer
   */
  function getReceiverBeakerColors(colorArray:Array<string>, giverColor:Array<string>, numberColorsTransferred:number): Array<string>{
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
   * Stores the player's progress (current level) in memory
   * @param {number} currentLevel the level to store
   */
  const storeLevel = async (currentLevel:number) => {
    try {
      await (()=> {});//AsyncStorage.setItem(memoryKey, currentLevel);
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 
   * @returns {Promise<number>} Player's current level
   */
  const getLevel = async (): Promise<number> => {
    return await 0;
    // try {
    //   const level = await AsyncStorage.getItem(memoryKey);
    //   if (level != null){
    //     return level
    //   } else {
    //     return "0"
    //   }
    // } catch (e) {
    //   console.error(e)
    //   return "0";
    // }
  }

  /**
   * 
   * @param {number} level the level number
   * @returns {Array<Array<string>>} the gameplay setup (initial flasks configuration)
   */
  function getLevelData(level:number): Array<Array<string>> {
    return Levels[level]

  }

  
  /**
   * 
   * @param {Array<string>} colors the colors in a flask
   * @returns {number} the count of occurrences of the top color (0 if flask is empty, else 1-4)
   */
  function countTopColor(colors:Array<string>): number{
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
   * @param {Array<string>} colors the configuration of a flask
   * @returns {number} the count of empty slots in a flask
   */
  function countEmpty(colors:Array<string>): number{
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
   * @param {Array<Array<string>>} colorConfigs The current flasks
   * @returns {boolean} True if a win has occurred, otherwise false
   */
  function checkWin(colorConfigs:Array<Array<string>>): boolean{
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

type Move = {
  giverIndex: number,
  receiverIndex: number,
  numberColorsTransferred: number
};

  /**
 * Given the last move in moveHistory, undoMove will return a copy of colorConfigs where the last move has been
 * undone. 
 * @param {Array<Array<string>>} colorConfigs - current configuration
 * @param {Array<Move>} moveHistory - array where each object is in form {giverIndex: Integer, receiverIndex: Integer} 
 */
function undoMove(colorConfigs: Array<Array<string>>, moveHistory: Array<Move>): Array<Array<string>> {
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

  

  
  const backgroundColor = "#ebf2ff"

  const [currentLevel, setCurrentLevel] = useState<number>(0) // default value
  const [colorConfigs, setColorConfigs] = useState<string[][]>([["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]); // default value
  useEffect(() => {
    getLevel().then((level) => {
      setCurrentLevel(level);
      setColorConfigs(getLevelData(level));
    })    
  }, [])


  const [giverColor, setGiverColor] = useState<string[]>([]);
  const [selectedVialIndex, setSelectedVialIndex] = useState(-1);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [win, setWin] = useState(false);
  return (
    <View>
      <TopMenu 
        onBackClick={() => {
          setColorConfigs(undoMove(colorConfigs, moveHistory))
          setMoveHistory([...moveHistory.slice(0, moveHistory.length - 1)])
        }} 
        onRestartClick={() => {
          setColorConfigs(getLevelData(currentLevel))
          setMoveHistory([])
        }}/>

      <FlatList 
        data={colorConfigs} 
        numColumns={5} 
        contentContainerStyle={styles.container}
        renderItem={( item ) => {
        const itemColors: Array<string> = item["item"]
        return <Pressable  
        onPress = {(e) => { if(!win) {
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
            setSelectedVialIndex(-1)
            setMoveHistory([...moveHistory, {giverIndex: selectedVialIndex, receiverIndex: currentVialIndex, numberColorsTransferred: numberColorsTransferred}])
            let isNewWin = checkWin(newColorConfigs);
            setWin(isNewWin)
            if (isNewWin){
              storeLevel(Number(currentLevel) + 1); 
              setMoveHistory([]);

            }
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
      keyExtractor={(item, index) => String(index)} />
      {win ? 
        <WinMenu 
          onNext={() => {
            setCurrentLevel(Number(currentLevel) + 1);
            setColorConfigs(getLevelData(Number(currentLevel) + 1))
            setGiverColor([]);
            setSelectedVialIndex(-1);
            setWin(false);
          }}
          textStyles={styles.generalText}/> :
        <></>}
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
    fontSize: 55
  },

  container: {
    margin: 10,
    backgroundColor: '#ebf2ff',
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});
