import React, { createContext, useState } from "react";
import main from "../gemini";

export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response,setResponse]=useState(false)
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);

    //
    // voices get karo
    let voices = window.speechSynthesis.getVoices();
    // ek female voice dhoondo (naam se)
    let femaleVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("zira") || // Windows female
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman")
    );
    // agar female voice mili to use karo
    if (femaleVoice) {
      text_speak.voice = femaleVoice;
    }
    //

    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
   
    let reply = await main(prompt);
     setPrompt(reply);
    speak(reply);
    setResponse(true)
  
    setTimeout(()=>{
        setSpeaking(false)
    },6000)
  }

  let speechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognitionResult;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let transcript = e.results[0][0].transcript;
    setPrompt(transcript);
    aiResponse(transcript);
    takeCommand(transcript.toLowerCase())
  };
  function takeCommand(command){
    if (command.includes("open")&& command.includes('youtube')) {
        window.open("https://www.youtube.com/","_blank")
        speak("opening Youtube")
        setPrompt("opening youtube")
        setTimeout(() => {
            setSpeaking(false)
        }, 3000);
    }else{
     aiResponse(command)
    }
  }

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,setResponse
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
}

export default UserContext;
