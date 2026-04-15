import { useState, type FormEvent } from "react";
import "./ChatBot.css";

//Creo un tipo personalizzato per definire chi ha mandato un messaggio
type MessageSender = "user" | "bot";

//Descrive la forma di un messaggio
type ChatMessageData = {

    id: number; //Identificator univoco del messaggio
    text: string; //Testo del messaggio
    sender: MessageSender; //Chi ha mandato il messaggio

};

//Specifico che il componente ChatMessage riceverà una prop chiamata "message"
type ChatMessageProps = {

    message: ChatMessageData;

};

//Creo un array di messaggi inizali da displayare all'avvio
const initialMessages: ChatMessageData[] = [
    {
        id: 1,
        sender: "bot",
        text: "Ciao! Scrivimi una domanda e ti rispondero qui."
    },
    {
        id: 2,
        sender: "user",
        text: "Come stai?"
    },
    {
        id: 3,
        sender: "bot",
        text: "Sto bene, grazie!"
    }
];

//Creo il componente ChatMessage, che riceve un oggetto "message" con le proprietà definite in ChatMessageData
function ChatMessage({ message }: ChatMessageProps) {

    //Definisco in una variabile booleana se il mittente è l'utente
    const isUser = message.sender === "user";

    return (

        //Controllo chi sia il mittente e in base a quello seleziono la classe da utilizzare
        <div className={`message-row ${isUser ? "message-row-user" : "message-row-bot"}`}>
            <div className={`message-bubble ${isUser ? "message-user" : "message-bot"}`}>
                <span className="message-label">{isUser ? "Tu" : "Bot"}</span>
                <p>{message.text}</p>
            </div>
        </div>

    );

}


//Funzione da richiamare in App.tsx per integrare la chat
export default function ChatBot() {

    //Creo 2 variabili reattive
    const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");

    //Funzione che gestisce l'invio del messaggio
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        //Impedisce il refresh della pagina
        event.preventDefault();

        //Salvo in una variabile quello che l'utente ha inserito in input e tolgo gli spazi vuoti all'inizio e alla fine
        const trimmedValue = inputValue.trim();

        //Se la variabile è vuota, non si fa nulla
        if (!trimmedValue) {
            return;
        }

        console.log(trimmedValue);

        //Creo un oggetto "userMessage" di tipo ChatMessageData
        const userMessage: ChatMessageData = {
            id: Date.now(),
            sender: "user",
            text: trimmedValue,
        };


        //Aggiorno la lista dei messaggi aggiungendo i 2 nuovi messaggi
        setMessages((currentMessages) => [...currentMessages, userMessage]);
        //Svuoto l'input
        setInputValue("");

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000);

        //Fetcho una richiesta al server all'endpoint "chat"
        const res = await fetch("http://localhost:3000/chat", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: trimmedValue }),
            signal: controller.signal,

        });
        clearTimeout(timeout);

        const risposta = await res.json();


        const botMessage: ChatMessageData = {
            id: Date.now() + 1,
            sender: "bot",
            text: risposta.risposta,
        };

        setMessages(curr => [...curr, botMessage]);

    };

    return (

        <div id="chat-container">

            <div id="chat-messages">

                {/*Scorro l'array di messaggi e per ogni elemento creo un oggetto ChatMessage*/}
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}

            </div>

            {/*Utilizzo il form per inviare il messaggio, così che è inviabile anche da tastiera*/}
            <form id="chat-input" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Scrivi la tua domanda"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <button type="submit">Invia</button>

            </form>

        </div>

    );
}
