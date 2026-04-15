import { openai } from "../config/openai.js";
import "dotenv/config";

//Funzione che crea un embedding di una stringa
export async function getEmbedding(text: string): Promise<number[]> {

    /*

    //Utilizzo la funzione di OpenAI per creare un embedding dato una stringa (quella passata come argomento della funzione)
    const response = await openai.embeddings.create({

        model: "text-embedding-3-small",
        input: text,

    });

    //Salvo il risultato in una variabile e controllo che non sia nulla
    const firstEmbedding = response.data[0];

    //Se è nullo, lancio un errore
    if (!firstEmbedding) {

        throw new Error("Impossibile creare l'embedding: nessun risultato");

    }

    return firstEmbedding.embedding;

    */

    //Utilizzo Ollama per creare un embedding dato una stringa
    const res = await fetch("http://ollama:11434/api/embedding", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

            model: "nomic-embed-text",
            prompt: text,

        }),

    });

    //Controllo se c'è qualche errore nella risposta
    if (!res.ok) throw new Error(`Ollama error: ${res.statusText}`);

    //Rendo i dati restituiti in formato json
    const data = await res.json();

    //Controllo che ci sia un risultato
    if (!data.embedding) throw new Error("Impossibile creare l'embedding: nessun risultato");

    return data.embedding;

}

//Funzione per creare più embeddings per più stringhe
export async function getEmbeddings(chunks: string[]) {

    //Creo una variabile che conterrà tutti gli embeddings
    const results = [];

    //Creo un ciclo dove richiamo ogni volta la funzione "getEmbedding" per creare l'embedding di ogni chunk
    for (const chunk of chunks) {

        //Chiamo la funzione creata prima
        const embedding = await getEmbedding(chunk);

        //Inserisco l'embedding creato nella variabile creata all'inizio della funzione
        results.push({

            text: chunk,
            embedding: embedding,

        });
    }

    return results;
}