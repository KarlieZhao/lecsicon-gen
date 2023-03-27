let RiTa = require('rita');
const fs = require('fs');

let words = [];

let selection = [];
const roots = ['cc', 'ex', 'in', 'jj', 'md', 'nn', 'pos', 'rb', 'vb', ];
const punct = /[\,\.\:\;\'\-]/g;

function getRoot() {
    for (let i = 0; i < words.length; i++) {
        let pos = RiTa.pos(words[i]);
        if (roots.includes(pos[0]) && !punct.test(words[i])) {
            selection.push(words[i]);
        }else{
            console.log(words[i]);
        }
    }
    console.log(selection)
    writeToJson(selection, "wordlist.json")
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

module.exports = writeToJson;
