# lecsicon-gen

### A JS application that plays acrostics with gpt3.5-turbo. [demo](https://karliezhao.github.io/lecsicon/)

```
$ git clone https://github.com/KarlieZhao/lecsicon-gen.git
$ cd lecsicon-gen
$ npm install
```

add api key to .env, or in simply turbo.js
```
const configuration = new Configuration({
    apiKey: <YOUR_OPENAI_API_KEY>
});
```
To run
```
$ cd ./src
$ node turbo.js
```
which will create two .json files for correct and incorrect word-sentence pairs. To sort,

```
$ node sort.js
```
