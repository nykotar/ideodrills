var voiceSelect = document.querySelector('select')
var voices = window.speechSynthesis.getVoices();

//so we can find custom ideograms
var chipInstances;

document.addEventListener('DOMContentLoaded', function() {

    //Populate voice (language) list
    for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].lang;
        option.setAttribute("voice-index", i);
        voiceSelect.appendChild(option);

        //Set en-US as default language if available
        if (voices[i].lang === "en-US") {
            voiceSelect.selectedIndex = i;
        }
    }


    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    elems = document.querySelectorAll('.chips');
    chipInstances = M.Chips.init(elems, {
        placeholder: 'Enter ideogram',
        secondaryPlaceholder: '+Ideogram',
      });
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

    for(var i = 0; i < chipInstances[0].chipsData.length; i++) {
        ideograms.push(chipInstances[0].chipsData[i].tag);
    }

    if(ideograms.length < 2) {
        M.toast({html: 'Select at least 2 ideograms!'})
    } else {
        x = window.setInterval(randomize, 1200);
    }
}

function randomize() {
    var rand = Math.floor(Math.random() * ideograms.length);
    var utterThis = new SpeechSynthesisUtterance(ideograms[rand]);
    utterThis.voice = voices[voiceSelect.selectedOptions[0].getAttribute("voice-index")]
    window.speechSynthesis.speak(utterThis);
}