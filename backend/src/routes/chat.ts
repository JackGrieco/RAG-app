import { Router } from "express";
import { getEmbedding } from "../utils/embedder.js";
import { pool } from "../db.js";

//Creo la mia route
const router = Router();

//Creo una richiesta POST
router.post("/", async (req, res) => {

    const { message } = req.body;

    //Salvo in una variabile gli embeddings creati dal messaggio mandato dall'utente
    const queryEmbedding = await getEmbedding(message);

    //Eseguo una query al database per trovare i chunk più simili al messaggio dell'utente
    const result = await pool.query(

        `SELECT text, 
        1 - (embedding <=> $1::vector) AS score
        FROM chunks
        ORDER BY embedding <=> $1::vector
        LIMIT 3`,
        [JSON.stringify(queryEmbedding)]
        //1 - (embedding <=> $1::vector) = calcola la similarità tra l'embedding del messaggio dell'utente e i chunk nel database (così più vicino ad 1 più è simile)
        // "<=>" = operatore cosine distance

    );

    //Prendo i risultati della query e li unisco in un unico testo, scorro i risultati della queri e li unisco creando una unica riga
    const context = result.rows.map(r => r.text).join("\n\n");

    console.log("Questo è il contesto ", context);


    //Passo tutto il contesto a ollama3.2
    const risposta = await fetch("http://ollama:11434/api/generate", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

            model: "llama3.2:1b",
            prompt: `Rispondi in una frase: ${message}`,
            stream: false,

        }),

    });
    /*
    prompt: `Usa il seguente contesto per rispondere alla domanda. 
            Se la risposta non è nel contesto, dillo chiaramente.

            Contesto:
            ${context}

            Domanda: ${message}`, */

    const data = await risposta.json();

    console.log("Questa è la risposta ", data.response);

    res.json({

        message: "Ecco la risposta",
        risposta: data.response,

    });



});

export default router;