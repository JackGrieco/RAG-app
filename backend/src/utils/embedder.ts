import { openai } from "../config/openai.js";

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

    //Embedding "pseudo-coerente"
    const base = text.length;

    return Array.from({ length: 10 }, (_, i) =>

        Math.sin(base + i)

    );

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