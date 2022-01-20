




   /*Get a random word from api*/
function getwordsfromapi(){
    fetch("https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=6&maxLength=10&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
    .then(data => data.json())
    .then(data => {
        word= data[0].word;
        word = word.toUpperCase();
        render();})
    .catch(err => {word = "PINEAPPLE";render()})  //If error fallback to word pineapple
