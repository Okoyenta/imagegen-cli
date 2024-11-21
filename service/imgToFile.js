const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Downloads and saves an image from a URL to the file system.
 *
 * @param {string} imageUrl - The URL of the image.
 * @param {string} filePath - The file path where the image should be saved.
 */
async function saveImageToFile(imageUrl, urlDirectory) {
    try {

        const fileName = `image-${Date.now()}.png`;
        const filePath = path.join(urlDirectory, fileName);

        // Ensure the directory exists
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // Fetch the image and save it
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream', // Stream the image for saving
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`Image saved successfully to ${filePath}`);
                resolve(filePath);
            });
            writer.on('error', (err) => {
                console.error('Error saving the image:', err);
                reject(err);
            });
        });


    } catch (error) {
        console.error('Failed to download the image:', error.message);
    }
}

const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
};

module.exports = { saveImageToFile, ensureDirectoryExists };
