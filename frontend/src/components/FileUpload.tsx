import { useState } from "react";

//Esporto la funzione così da poterla utilizzare in App.tsx
export default function FileUpload() {

    //Creo 2 variabili reattive
    //Questa identifica il file selezionato, che ovviamente all'inizio è impostato su null
    const [file, setFile] = useState<File | null>(null);
    //Questa contiene il messaggio di risposta del backend
    const [message, setMessage] = useState("");

    //Funzione che gestisce il caricamento dei file
    const handleUpload = async () => {
        //Per prima cosa verifico se è stato selezionato un file
        if (!file) return;

        //Creo un oggetto FormData che serve per inviare il file al backend
        const formData = new FormData();
        //"Aggiungo" il file all'oggetto FormData
        formData.append("file", file);

        //Fetcho una richiesta al server all'endpoint "uploads"
        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        //Prendo il responso del server e lo trasformo in un JSON
        const data = await res.json();

        //Successivamente aggiorno la variabile reattiva del messaggio mostrando il messaggio di risposta dal server
        setMessage(data.message);
    };

    //Creo la struttura JSX
    return (
        <div>
            <h2>Upload file</h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button onClick={handleUpload}>Carica</button>

            <p>{message}</p>
        </div>
    );
}