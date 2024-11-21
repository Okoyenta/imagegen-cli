const OpenAi = require("openai");
const { saveImageToFile } = require('./imgToFile.js')
const generateRandomNumber = require("./random.js")

async function generateImage(apiKey, prompted, outputDirectory, aspectRatio){
    try{

        const client = new OpenAi({
            apiKey: apiKey,
            baseURL: "https://api.together.xyz/v1",
        })

        const randomNumber = generateRandomNumber();

        let width;
        let height;

        if( aspectRatio == "square" ){
            width = 1024;
            height = 1024
        } 
        
        if (aspectRatio == "portrait" ){
            width = 576;
            height = 1024
        }

        if (aspectRatio == "landscape" ){
            width = 1024;
            height = 576
        }

        let userPrompt;

        if (prompted){
            userPrompt = prompted;
            //console.log('prompt exist' + prompted );
        }

        const image = await client.images.generate({
            prompt: userPrompt,
            model: "black-forest-labs/FLUX.1-schnell-Free",
            n:1,
            height: height,
            width: width,
            steps: 4,
            seed: randomNumber,
        })

        image_url = image.data[0].url;
        //console.log(image_url);
        console.log("image generated");
        
        return await saveImageToFile(image_url, outputDirectory);

    } catch (e){
        console.error('Error ecountered while generating image check your network connectivity');
        return "error";
    }
  }


module.exports = generateImage;