import { useState } from 'react' //Prendo le funzionalità di React
import './App.css'
import { testBackend } from "./services/api";
import FileUpload from "./components/FileUpload";
import ChatBot from './components/ChatBot';


function App() {

  //Creo una variabile reattiva, dove "message" è il valore e "setMessage" è la funzione che lo modifica
  //Quindi quando cambia, React aggiorna la UI
  const [message, setMessage] = useState(""); //"useState" è una funzione React che serve appunto per creare una variabile reattiva che volendo si può aggiornare 

  //Funzione di JS
  const handleClick = async () => {

    //Chiamo la funzione "testBackend" e il risultato lo salvo nella variabile "res"
    const res = await testBackend();
    //Richiamo la funzione "setMessage" della variabile reattiva per cambiare lo stato della variabile "message"
    setMessage(res);

  };

  return (

    //In realtà non è HTML ma è JSX
    <div>
      <h1>RAG App</h1>
      <button onClick={handleClick}>Test backend</button>
      <p>{message}</p>

      <FileUpload />

      <ChatBot />

    </div>

  );

}

export default App
