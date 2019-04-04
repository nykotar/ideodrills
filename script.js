var x;
var ideograms = [];

function start() {
    var checked = document.getElementsByName('ideogram');
    for(var i = 0; i < checked.length; i++) {
        if(checked[i].checked) {
            ideograms.push(checked[i].value);
        }
    }
    x = window.setInterval(randomize, 1200);
}

function randomize() {
    var rand = Math.floor(Math.random() * ideograms.length);
    var utterThis = new SpeechSynthesisUtterance(ideograms[rand]);
    utterThis.lang = "en-US";
    window.speechSynthesis.speak(utterThis);
}