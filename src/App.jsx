import { useContext, useState } from "react";
import va from "./assets/ai.png";
import speak from "./assets/speak.gif";
import { CiMicrophoneOn } from "react-icons/ci";
import aiSpeak from './assets/aiVoice.gif'
import { datacontext } from "./context/UserContext";
function App() {
  const { recognition, speaking, setSpeaking,prompt,setPrompt,response,setResponse } = useContext(datacontext);

  return (
    <>
      <div className="w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-start gap-3 ">
        <img src={va} className=" h-[70%]" />
        <span className=" text-2xl bg-gradient-to-r from-blue-300 to-red-600 bg-clip-text text-transparent">
          I'm Shifra,Your Advance Virtual Assistant
        </span>
        {!speaking ? (
          <button
            className="w-[150px] h-[40px] flex items-center text-xl justify-center rounded-4xl gap-3  cursor-pointer bg-cyan-300 shadow-cyan-500/50 shadow-2xl"
            onClick={() => {
              setSpeaking(true);
              setResponse(false)
              setPrompt('listening')
              recognition.start();
            }}
          >
            Click here <CiMicrophoneOn />
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center">
           {!response? <img
              src={speak}
              className="w-[80px] "
              onClick={() => setSpeaking(false)}
            />: <img src={aiSpeak} className="h-[80px] w-[400px]" /> }
            <p className="text-white ">{prompt}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
