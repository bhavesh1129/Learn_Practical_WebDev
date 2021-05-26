function helpFunction(dirPath) {
    console.log(`
    List of all available commands:
    1) molu tree "directoryPath"
    2) molu organize "directoryPath"
    3) molu help 
    `);
}

module.exports = {
    helpKey: helpFunction
}