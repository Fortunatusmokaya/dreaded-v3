const similarity = require('similarity');
const path = require('path');
const fs = require('fs');

const cmdsDir = path.join(__dirname, '..', 'Commands');

function findAllCommandFiles(dir) {
    let commandFiles = [];

    function findFiles(directory) {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                findFiles(filePath);
            } else if (file.endsWith('.js')) {
                commandFiles.push(filePath);
            }
        }
    }

    findFiles(dir);
    return { commandFiles };
}

const { commandFiles } = findAllCommandFiles(cmdsDir);

const getCommands = () => {
    return commandFiles.map(file => path.basename(file, '.js'));
};

const findClosestCommand = (inputCommand, threshold = 0.6) => {
    const availableCommands = getCommands();
    let closestCommand = '';
    let maxSimilarity = 0;

    availableCommands.forEach(command => {
        const similarityScore = similarity(inputCommand.toLowerCase(), command.toLowerCase());
        if (similarityScore > maxSimilarity && similarityScore < 1) {
            maxSimilarity = similarityScore;
            closestCommand = command;
        }
    });

    return maxSimilarity >= threshold ? closestCommand : null;
};

module.exports = { findClosestCommand };