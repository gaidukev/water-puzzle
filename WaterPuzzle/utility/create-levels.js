//import AsyncStorage from '@react-native-async-storage/async-storage';
class Beaker{

    getBeaker(color){
        if (color == undefined) {
            this.content = ["", "", "", ""]
        } else {
            this.content = [color, color, color, color]
        }
    }

    /**
     * 
     * @param {string} color Trying to add this to content.
     * @returns {boolean} Whether adding was successful
     */
    addColor(color){
        const addIndex = this.#getBottomMostEmptyIndex()
        if (addIndex != -1) {
            this.content[addIndex] = color
        }
    }

    /**
     * 
     * @returns {integer} The lowest index where the flask is empty, or -1 if the flask is full
     */
    #getBottomMostEmptyIndex(){
        for (let i = 3; i >= 0; i--){
            if (this.content[i] == "") {
                return i
            }
        }
        return -1
    }

    /**
     * 
     * @returns {integer} The highest index where the flask is non-empty, or -1 if the flask is empty
     */
    #getTopMostNonEmptyIndex(){
        for (let i = 0; i < 4; i++){
            if (this.content[i] != "") {
                return i
            }
        }
        return -1
    }

    /**
     * 
     * @returns {string} Color that's been removed, or the empty string if the beaker is empty
     */
    removeColor(){
        const removeIndex = this.#getTopMostNonEmptyIndex()
        if (removeIndex != -1) {
            const removeColor = this.content[removeIndex];
            this.content[removeIndex] = ""
            return removeColor
        }
        return ""
    }

    getContent(){
        return this.content
    }

    isEmpty(){
        return this.#getTopMostNonEmptyIndex() == -1
    }

    isFull(){
        return this.#getBottomMostEmptyIndex() == -1
    }
}

function pickRandomGiver(beakers){
    let found = false
    let selectedBeaker;
    while(!found){
    //for (let j = 0; j < 6; j++){
        selectedBeaker = beakers[Math.floor(Math.random()*beakers.length)];
        if (!selectedBeaker.isEmpty()){
            found = true
        }
    }
    return selectedBeaker;
}

function pickRandomReceiver(beakers, giverBeaker){
    let found = false;
    let selectedBeaker;
    while(!found){
        selectedBeaker = beakers[Math.floor(Math.random() * beakers.length)];
        if (!selectedBeaker.isFull() & selectedBeaker !== giverBeaker){
            found = true;
        }
    }
    return selectedBeaker;
}

function countEmptyBeakers(beakers){
    let emptyBeakers = 0;
    for (let beaker of beakers){
        if (beaker.isEmpty()){
            emptyBeakers++
        }
    }
    return emptyBeakers;
}

function emptyOneBeaker(colorConfig){
    let selectedBeaker;
    while ((typeof selectedBeaker === "undefined") ? true : selectedBeaker.isEmpty()){
        selectedBeaker = colorConfig[Math.floor(Math.random() * colorConfig.length)]
    }
    while (!selectedBeaker.isEmpty()){
        const receiver = pickRandomReceiver(colorConfig, selectedBeaker);
        const color = selectedBeaker.removeColor();
        receiver.addColor(color);
    }

    return colorConfig;
}

/**
 * 
 * @param {Array.<string>} colors Specifies all the colors in the level, as hex values.
 * @param {integer} countEmpty Number of beakers we want to leave empty. 
 * @param {*} numberOfShuffles How many steps will be taken to generate the configuration. Potentially 
 *  a proxy for difficulty.
 * @returns {Array.<string[]>} Initial colors in each beaker at the start of the level.
 */
function generateColorConfig(colors, countEmpty, numberOfShuffles){
    let colorConfigs = [];
    for (let i = 0; i < (colors.length + countEmpty); i++) {
        let currentBeaker;
        if (i < colors.length) {
            currentBeaker = new Beaker()
            currentBeaker.getBeaker(colors[i])
        } else {
            currentBeaker = new Beaker()
            currentBeaker.getBeaker(undefined)
        }
        colorConfigs.push(currentBeaker);
    }



    for (let i = 0; i < numberOfShuffles; i++) {
        const giver = pickRandomGiver(colorConfigs);
        const receiver = pickRandomReceiver(colorConfigs, giver);
        const color = giver.removeColor();
        receiver.addColor(color);
    }

    let currentCountEmpty = countEmptyBeakers(colorConfigs)
    while (currentCountEmpty < countEmpty){
        colorConfigs = emptyOneBeaker(colorConfigs)
        currentCountEmpty = countEmptyBeakers(colorConfigs)
    }

    return colorConfigs.map((el) => el.getContent())
}

// async function storeData(levelid, initialColorConfig) {
//     try {
//         const colorConfig = JSON.stringify(initialColorConfig)
//         await AsyncStorage.setItem(levelid, colorConfig)
//     } catch (e) {
//         console.error("Error: ", e)
//     }
//     return 0
// }


function generateLevels(numLevels) {

    const colors = ["#EDD382", "#61185e", "#D72638", "#9882AC", "#C17817", "#2E6171", "#4f4338"]

    for (let i = 0; i < numLevels; i++){
        const colorConfigs = generateColorConfig(colors, 2, 150)
        console.log("Color configs!", colorConfigs)
    }
}

generateLevels(5)