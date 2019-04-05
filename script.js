var voiceSelect = document.querySelector('select')
var voices = window.speechSynthesis.getVoices();

document.addEventListener('DOMContentLoaded', function() {

    //Populate voice (language) list
    for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].lang;
        option.setAttribute("voice-index", i);
        voiceSelect.appendChild(option);

        if (voices[i].lang === "en-US") {
            voiceSelect.selectedIndex = i;
        }
    }


    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });


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
    utterThis.voice = voices[voiceSelect.selectedOptions[0].getAttribute("voice-index")]
    window.speechSynthesis.speak(utterThis);
}