const fs = require('fs');
const path = require('path');

// Define the config file path
const CONFIG_FILE = path.join(require('os').homedir(), '.image-generator-config.json');


// Ensure the configuration file exists
const ensureConfigFile = () => {
    if (!fs.existsSync(CONFIG_FILE)) {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ apiKey: '' }, null, 2));
    }
};

// Get the API key from the config file
const getApiKey = () => {
    ensureConfigFile();
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    return config.apiKey || null;
};


// Save the API key to the config file
const saveApiKey = (apiKey) => {
    ensureConfigFile();
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config.apiKey = apiKey;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('API key saved successfully!');
};


module.exports = {getApiKey, saveApiKey }