import * as fs from "fs"
import { count } from 'console';
const modes = {
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD"
}

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
    getTopMostNonEmptyIndex(){
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
        const removeIndex = this.getTopMostNonEmptyIndex()
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
        return this.getTopMostNonEmptyIndex() == -1
    }

    isFull(){
        return this.#getBottomMostEmptyIndex() == -1
    }
}

/**
 * A giver is valid if:
 *  - it is not empty
 * AND:
 *  - it's one item sitting in an empty glass, or
 *  - it is on top of another color that is itself
 * @param {} beaker 
 */
function isValidGiver(beaker){
    const isEmpty = beaker.isEmpty()
    const justOneItem = beaker.getContent()[2] == ""
    const onTopOfItself = justOneItem ? false : beaker[beaker.getTopMostNonEmptyIndex() + 1] == beaker[beaker.getTopMostNonEmptyIndex()]
    return !isEmpty & (onTopOfItself | justOneItem);
}

function pickRandomGiver(beakers){
    let found = false
    let selectedBeaker;
    while(!found){
    //for (let j = 0; j < 6; j++){
        selectedBeaker = beakers[Math.floor(Math.random()*beakers.length)];
        //if (!selectedBeaker.isEmpty()){
        if (isValidGiver(selectedBeaker)){
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

function moveEmptyToEnd(colorConfigs, numEmpty){
    console.log("IN MOVE EMPTY TO END: ", numEmpty)
    const indexFirstEmpty = colorConfigs.findIndex((el) => JSON.stringify(el) == JSON.stringify(["", "", "", ""]))

    if (numEmpty == 2){
        if (indexFirstEmpty != (colorConfigs.length - 2)){
            const replacementIndex = JSON.stringify(colorConfigs[colorConfigs.length - 1]) == JSON.stringify(["", "", "", ""]) ? colorConfigs.length - 2 : colorConfigs.length - 1
            
            let replacementIndexValue = colorConfigs[replacementIndex];
            colorConfigs[replacementIndex] = ["", "", "", ""]
            colorConfigs[indexFirstEmpty] = replacementIndexValue
            if (colorConfigs[colorConfigs.length - 2] != ["", "", "", ""]){
                const indexSecondEmpty = colorConfigs.findIndex((el) => JSON.stringify(el) == JSON.stringify(["", "", "", ""]))
    
                replacementIndexValue = colorConfigs[colorConfigs.length - 2]
                colorConfigs[indexSecondEmpty] = replacementIndexValue;
                colorConfigs[colorConfigs.length - 2] = ["", "", "", ""]
            }
            
        }
    }
    else if (numEmpty == 1) {

        console.log("COLOR CONFIGS: ", colorConfigs)
        const replacementIndex = JSON.stringify(colorConfigs[colorConfigs.length - 1]) == JSON.stringify(["", "", "", ""]) ? colorConfigs.length - 2 : colorConfigs.length - 1
        if (replacementIndex != colorConfigs.length - 1){
            colorConfigs[replacementIndex] = colorConfigs[colorConfigs.length - 1];
            colorConfigs[colorConfigs.length - 1] = ["", "", "", ""]
        }
    }

    console.log("COLOR CONFIGS AFTER CHANGE: ", colorConfigs)
    return colorConfigs
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



    console.log("COLOR CONFIGS BEFORE SHUFFLE: ", colorConfigs)

    for (let i = 0; i < numberOfShuffles; i++) {
        const giver = pickRandomGiver(colorConfigs);
        const receiver = pickRandomReceiver(colorConfigs, giver);
        const color = giver.removeColor();
        receiver.addColor(color);
        console.log("===================")
        for (let shuffle of colorConfigs) {
            console.log(`After shuffle ${i}: ${shuffle.getContent()}`)
        }
        console.log("==================")
    }

    let currentCountEmpty = countEmptyBeakers(colorConfigs)
    while (currentCountEmpty < countEmpty){
        colorConfigs = emptyOneBeaker(colorConfigs)
        currentCountEmpty = countEmptyBeakers(colorConfigs)
    }

    colorConfigs = colorConfigs.map((el) => el.getContent());

    console.log("Color configs: ", colorConfigs)

    return moveEmptyToEnd(colorConfigs, countEmpty);
}



/**
 * generates x levels of given mode
 * @param {} numLevels 
 * @param {*} mode 
 */
function generateLevels(lowest, numLevels, mode) {
    function generate(genColors, countEmpty){
        let levels = []
        for (let i = lowest; i < numLevels + lowest; i++){
            const colorConfigs = generateColorConfig(genColors, countEmpty, 150)
            levels.push(colorConfigs)
            // fs.writeFile("C:/Users/mgaid.LAPTOP-FU341HDA/OneDrive/Documents/GitHub/water-puzzle2/water-puzzle/WaterPuzzle/levels/Level " + i.toString() + ".json", JSON.stringify(colorConfigs), function(err) {
            //     if (err){
            //         console.error(err)
            //     }
            // })
        }

        return levels
    }

    let colors;
    let countEmpty;
    if (mode == modes.easy){
        colors = ["#FFE593", "#610B5D", "#D21427", "#189ED8", "#FF9200", "#2E6171"]
        countEmpty = 2
    } else if (mode == modes.medium){
        colors = ["#FFE593", "#610B5D", "#D21427", "#189ED8", "#FF9200", "#2E6171", "#484541"]
        countEmpty = 2
        
    } else if (mode == modes.hard){
        //colors = ["#FFE593", "#610B5D", "#D21427", "#189ED8", "#FF9200", "#2E6171", "#484541", "#3cb1ff"]
        colors = ["#FFE593", "#610B5D", "#D21427", "#189ED8", "#FF9200", "#2E6171", "#484541"]
        countEmpty = 1
    }

    return generate(colors, countEmpty)    

}

let levels = []
levels = levels.concat(generateLevels(0, 10, modes.easy));
levels = levels.concat(generateLevels(10, 30, modes.hard));
levels = levels.concat(generateLevels(30, 45, modes.medium));
console.log(levels)
fs.writeFile("C:/Users/mgaid.LAPTOP-FU341HDA/OneDrive/Documents/GitHub/water-puzzle2/water-puzzle/WaterPuzzle/levels/Levels.json", JSON.stringify(levels), function(err) {
    if (err){
        console.error(err)
    }
})