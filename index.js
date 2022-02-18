//Init speechSynth API
const synth = window.speechSynthesis;

// DOM
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");



// Init voice array 
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices)
    //loop through voices and creat an option for each one 
    voices.forEach(voice =>{
        // creat option element
        const option =document.createElement("option");
        //fill option with voice and language 
        option.textContent = voice.name + "("+voice.lang+")";
        // set needed option attributes
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        voiceSelect.appendChild(option);
    });   
};

getVoices();

if (synth.onvoiceschanged !== undefined ){
    synth.onvoiceschanged = getVoices;
};

// speak
const speak = () => {
    if(synth.speaking){
      console.error('Already speaking...');
      return;
    };
    if(textInput.value !== ""){
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak end
        speakText.onend = e => {
            console.log('Done speaking...');
        }
        //speak error
        speakText.onerror = e => {
            console.error('Something went wrong');
        }
        //selected voices
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
        // loop through voices 
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
            speakText.voice = voice;
            }

        });
        //set pitch and rate 
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // speak
        synth.speak(speakText);

    }
};

//EVENT LISTENERS

// TEXT FROM SUBMIT 
textForm.addEventListener('submit' , e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value 
rate.addEventListener('change', e => rateValue.textContent =
rate.value)
// pitch value 
pitch.addEventListener('change', e => pitchValue.textContent =
pitch.value)

// voice select change 
voiceSelect.addEventListener('change', e => speak ());