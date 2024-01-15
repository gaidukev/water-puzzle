import AsyncStorage from '@react-native-async-storage/async-storage';

class Beaker{
    constructor(){
        this.content = ["", "", "", ""]
        return content
    }

    constructor(color){
        this.content = [color, color, color, color]
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
            if (this.content == "") {
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
            if (this.content != "") {
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
}

function pickRandomGiver(beakers){
    
}

function pickRandomReceiver(beakers){

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
    const colorConfigs = [];
    for (let i = 0; i < (colors.length + countEmpty); i++) {
        if (i < colors.length) {
            const currentBeaker = new Beaker(colors[i])
        } else {
            const currentBeaker = new Beaker()
        }
        colorConfigs.push(currentBeaker);
    }

    for (let i = 0; i < numberOfShuffles; i++) {
        const giver = pickRandomGiver(colorConfigs);
        const receiver = pickRandomReceiver();
        const color = giver.removeColor();
        receiver.addColor(color);
    }
}

async function storeData(levelid, initialColorConfig) {
    try {
        const colorConfig = JSON.stringify(initialColorConfig)
        await AsyncStorage.setItem(levelid, colorConfig)
    } catch (e) {
        console.error("Error: ", e)
    }
    return 0
}