const fs = require('fs');

let sort = sortList("correct.json");
sort = sortList("incorrect.json");

function sortList(fileName) {
    const olddata = fs.readFileSync(fileName, 'utf-8');
    const unsorted = JSON.parse(olddata);

    let sorted = unsorted.sort((a, b) => a.word.localeCompare(b.word));
    const data = JSON.stringify(sorted, null, 2);

    fs.writeFileSync(fileName, data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data written to file');
    });
}

function compare() {
    const olddata = fs.readFileSync("correct.json", 'utf-8');
    const json = JSON.parse(olddata);
    const correctWords = json.map(item => item.word);
}