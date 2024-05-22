
   var writingarea=document.querySelector("#writingarea");
  var outputarea=document.querySelector("#outputarea");
  var inputlang=document.querySelector("#inputlang");
  var outputlang=document.querySelector("#outputlang");
  var translatebtn=document.querySelector("#translatebtn").addEventListener("click",translate);
  var spkbtn=document.querySelector("#spkbtn").addEventListener("click",speak)
 


  const languages=[
  {name:"Malayalam",code:"ml-IN"},{name:"English",code:"en-US"},{name:"Hindi",code:"hi-IN"},{name:"Tamil",code:"ta-IN"},{name:"Arabic",code:"ar-XA"},{name:"Chinese",code:"yue-HK"},{name:"Danish",code:"da-DK"},
    {name:"French",code:"fr-CA"},{name:"German",code:"de-DE"},{name:"Japanese",code:"ja-JP"},
    {name:"Korean",code:"ko-KR"},{name:"spanish",code:"es-US"},{name:"Telungu",code:"te-IN"}
    ]
    
  
  

 

  languages.forEach((language)=>{

    //Options for inputlang(choose writing language)
    var options1=document.createElement("option");
    options1.text=language.name;
    options1.value=language.code;
    inputlang.appendChild(options1);

    //Options for outputlang(choose converting language)
    var options2=document.createElement('option');
    options2.text=language.name;
    options2.value=language.code;
    outputlang.appendChild(options2);

  })
  var writinglanguage
  var convertinglanguage
   inputlang.addEventListener("change",()=>{
    writinglanguage=inputlang.value;
  })
  outputlang.addEventListener("change",()=>{
    convertinglanguage=outputlang.value;
  })
  
 var speaktext

        function translate(){
           var text=writingarea.value;
     var api=`https://api.mymemory.translated.net/get?q=${text}&langpair=${writinglanguage}|${convertinglanguage}`
    fetch(api).then((response)=>response.json()).then((data)=>{
      outputarea.innerHTML=data.responseData.translatedText;
      speaktext=data.responseData.translatedText
  
    }).catch((error)=>{
      outputarea.innerHTML="Error Occured"
    });

}

 function speak(){
  var speech=new SpeechSynthesisUtterance();
  speech.text=speaktext;
  speech.lang=convertinglanguage;
  window.speechSynthesis.speak(speech);
 }







 

