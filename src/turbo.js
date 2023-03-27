const fs = require('fs');
let RiTa = require('rita');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const wordList = require('./wordlist.js');


let template =
    `I will give you a word.
Write a sentence or phrase in which the first letter of each word sequentially spells out my word.
Your sentence should not contain my word or any of the variations of my word. Your sentence doesn't need to have a strong semantic connection with my word.

Good examples:
Cake - Creating amazing kitchen experiences.
Fire - Fierce inferno razed everything.
Smile - Some memories invoke lovely emotions.

A bad example:
Abandon - Alice abandoned her plans to move to the city when she realized the cost of living was too high.

Now make a sentence for $1. 
Your response should only contain the sentence you make.`

run();

function run() {
    for (let i = 0; i < wordList.length; i++) {
        let prompt = template.replace("$1", wordList[i]);
        sendRequest(prompt, i, handleResponse);
    }
}

async function sendRequest(prompt, word_index, callback) {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }],
        });
        // console.log(completion.data.choices[0].message);
        let output = completion.data.choices[0].message;
        callback(word_index, output);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log("word_index: " + word_index);
    }
}

function handleResponse(word_index, data) {
    let fileName = "";
    let output = {
        word: wordList[word_index],
        sentence: data.content
    };
    if (checkRules(wordList[word_index], data.content)) {
        fileName = "correct.json";
    } else {
        fileName = "incorrect.json";
    }
    writeToJson(output, fileName);
}

function checkRules(word, sentence) {
    let words = RiTa.tokenize(sentence.toLowerCase());
    for (let i = 0; i < words.length; i++) {
        //if current index is punct, remove
        if (RiTa.isPunct(words[i])) {
            words.splice(i, 1);
        }
    }
    if (words.length != word.length) return false;
    for (let i = 0; i < words.length; i++) {
        if (word[i] != words[i][0]) {
            // console.log(word[i] + ": " + words[index]);
            return false;
        }
    }
    return true;
}

function writeToJson(data, fileName) {
    try {
        // Check if the file exists
        fs.accessSync(fileName);
    } catch (error) {
        // Create the file with an empty object
        fs.writeFileSync(fileName, JSON.stringify([]));
    }

    //preserve old data in json
    const olddata = fs.readFileSync(fileName, 'utf-8');
    let json = JSON.parse(olddata);
    json.push(data);
    const newData = JSON.stringify(json, null, 2);
    fs.writeFileSync(fileName, newData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data written to file');
    });
}

module.exports = checkRules;