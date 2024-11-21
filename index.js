#!/usr/bin/env node

const { Command } = require('commander');
const figlet = require('figlet');
const generateImage = require('./service/generateImage.js');
const { ensureDirectoryExists } = require('./service/imgToFile.js');
const {getApiKey, saveApiKey } = require("./service/getApiKey.js")
const os = require('os');
const path = require('path');


// CLI with commander.js
const program = new Command();

program
    .name('Image Generator CLI')
    .description('A CLI tool to generate images using an together AI API')
    .version('1.0.0');


// Command to save the API key
program
    .command('set-api-key')
    .description('Store your API key locally')
    .argument('<apiKey>', 'API key for authentication')
    .action((apiKey) => {

        if (!apiKey) {
            console.error('API key is required.');
            return;
        }

        saveApiKey(apiKey);
    });


program
    .command('generate')
    .description('Generate an image')
    .option('-p, --prompt <prompt>', 'Prompt for image generation eg. -p "flying cars". Use double " " around the prompt')
    .option('-d, --directory <path>', 'Directory to save the images', path.join(os.homedir(), 'Pictures'))
    .option('-r, --ratio <ratio>', 'your generated image aspect ratio ', 'portrait')
    .action(async (options) => {
        const { prompt, directory, ratio } = options;

        // Ensure API key exists
        const apiKey = getApiKey();
        if (!apiKey) {
            console.error(
                'No API key found. Please set your API key using the "set-api-key" command.'
            );
            return;
        }

    //     if(!ratio){
    //     if ( ratio != "landscape" || ratio != "square" || ratio != "portrait" ){
    //         console.error(
    //             'ratio not correct. Please set your -r as landscape or square or portrait.'
    //         );
    //         return;
    //     }
    // }

    if (ratio && !["landscape", "square", "portrait"].includes(ratio)) {
        console.error(
            'Ratio not correct. Please set your -r as landscape, square, or portrait.'
        );
        return;
    }

    if(!prompt){
        console.error(
            'Prompt is missing. Please set your -p with your image description'
        );
        return;
    }
        // Ensure output directory exists
        ensureDirectoryExists(directory);

        // console.log('\n===================================');
        // console.log('     Image Generator CLI');
        // console.log('===================================\n');

        console.log('\nGenerating image...\n');
        const savedPath = await generateImage(apiKey, prompt, directory, ratio);

        if(savedPath == "error"){
            // console.error(
            //     'Prompt is missing. Please set your -p with your image description'
            // );
            return;
        }
        console.log(`\nImage generation complete! Image saved at: ${savedPath}`);
    });

// // Welcome message with figlet
// figlet('Image Generator', (err, data) => {
//     if (err) {
//         console.log('Error loading welcome message:', err.message);
//     } else {
//         console.log(data);
//         program.parse(process.argv);
//     }
// });

// Parse the CLI arguments
console.log('\n===================================');
console.log('     ');
console.log('     Image Generator CLI');
console.log('     ');
console.log('===================================\n');
program.parse(process.argv);
