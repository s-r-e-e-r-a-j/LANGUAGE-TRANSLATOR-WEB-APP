// coded by Sreeraj
const writingarea = document.querySelector("#writingarea");
const outputarea = document.querySelector("#outputarea");
const inputlang = document.querySelector("#inputlang");
const outputlang = document.querySelector("#outputlang");

document.querySelector("#translatebtn").addEventListener("click", translate);
document.querySelector("#spkbtn").addEventListener("click", speak);

const languages = [
  { name: "Malayalam", code: "ml-IN" },
  { name: "English", code: "en-US" },
  { name: "Hindi", code: "hi-IN" },
  { name: "Tamil", code: "ta-IN" },
  { name: "Arabic", code: "ar-XA" },
  { name: "Chinese", code: "yue-HK" },
  { name: "Danish", code: "da-DK" },
  { name: "French", code: "fr-CA" },
  { name: "German", code: "de-DE" },
  { name: "Japanese", code: "ja-JP" },
  { name: "Korean", code: "ko-KR" },
  { name: "Spanish", code: "es-US" },
  { name: "Telugu", code: "te-IN" }
];

// Populate languages in dropdowns
languages.forEach(language => {
  const option1 = document.createElement("option");
  option1.text = language.name;
  option1.value = language.code;
  inputlang.appendChild(option1);

  const option2 = document.createElement("option");
  option2.text = language.name;
  option2.value = language.code;
  outputlang.appendChild(option2);
});

let writinglanguage, convertinglanguage, speaktext;

inputlang.addEventListener("change", () => {
  writinglanguage = inputlang.value;
});

outputlang.addEventListener("change", () => {
  convertinglanguage = outputlang.value;
});

function translate() {
  const text = writingarea.value.trim();
  if (!text) {
    outputarea.innerHTML = "Please enter some text.";
    return;
  }

  const api = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${writinglanguage}|${convertinglanguage}`;

  fetch(api)
    .then(response => response.json())
    .then(data => {
      outputarea.innerHTML = data.responseData.translatedText;
      speaktext = data.responseData.translatedText;
    })
    .catch(() => {
      outputarea.innerHTML = "Error occurred while translating.";
    });
}

function speak() {
  if (!speaktext) {
    outputarea.innerHTML = "Nothing to speak yet.";
    return;
  }

  const speech = new SpeechSynthesisUtterance();
  speech.text = speaktext;
  speech.lang = convertinglanguage;
  window.speechSynthesis.speak(speech);
}
