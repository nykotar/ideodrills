var voiceSelect = document.querySelector("#lang").querySelector('select')
var voices = [];

//so we can find custom ideograms later
var chipInstances;

document.addEventListener('DOMContentLoaded', function() {
    elems = document.querySelectorAll('.chips');
    chipInstances = M.Chips.init(elems, {
        placeholder: 'Enter ideogram',
        secondaryPlaceholder: '+Ideogram',
      });
});

/* This function is needed because the voice list is
 loaded asynchronously by the browser.
*/
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();

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
    M.FormSelect.init(elems);
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}


var countdown = document.getElementById("countdown");
var countdownInterval = null;
var endtime;
var timeLeft;
var speechInterval;
var ideograms = [];
var isPaused = false;

function start() {

    if(countdownInterval != null) {
        window.clearInterval(countdownInterval);
        window.clearInterval(speechInterval);
        countdownInterval = null;
        timeLeft = time_remaining(endtime).total;
        isPaused = true;
        document.getElementById("startBtn").innerHTML = 'Resume<i class="material-icons right">play_arrow</i>';
        return;
    }
    
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
        document.getElementById("stopBtn").classList.remove("scale-out");
        
        document.getElementById("startBtn").innerHTML = 'Pause<i class="material-icons right">pause</i>';

        if(!isPaused) {
            var time = document.getElementById("timer").value;
            var current_time = Date.parse(new Date());
            endtime = new Date(current_time + time*60*1000);

            countdown.style.display = "block";
            countdown.classList.remove("scale-out");
        } else {
            var current_time = Date.parse(new Date());
            endtime = new Date(current_time + timeLeft);
        }

        isPaused = false;

        var timeBetweenIdeograms = parseFloat(document.querySelector("#speed").querySelector("select").selectedOptions[0].value) * 1000
        speechInterval = window.setInterval(randomizeIdeogram, timeBetweenIdeograms);
        countdownInterval = window.setInterval(update_clock, 1000);

    }
}

function stop() {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
    window.clearInterval(speechInterval);

    countdown.classList.add("scale-out");
    countdown.style.display = "none";

    document.getElementById("stopBtn").classList.add("scale-out");
    document.getElementById("startBtn").innerHTML = 'Start<i class="material-icons right">send</i>';
}

function update_clock(){
    var t = time_remaining(endtime);
    countdown.innerHTML = t.minutes+':'+t.seconds;
    if(t.total<=0){ window.clearInterval(countdownInterval); }
}

//From https://codepen.io/yaphi1/pen/QbzrQP
function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

function randomizeIdeogram() {
    var rand = Math.floor(Math.random() * ideograms.length);
    var utterThis = new SpeechSynthesisUtterance(ideograms[rand]);
    utterThis.voice = voices[voiceSelect.selectedOptions[0].getAttribute("voice-index")]
    window.speechSynthesis.speak(utterThis);
}