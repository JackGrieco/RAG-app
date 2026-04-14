import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { chunkText } from "../utils/chunker.js"; //Ho scritto "import {chunkText}" tra parentesi graffe perché sto esportando con un nome preciso
import { getEmbeddings } from "../utils/embedder.js";

//Creo la mia route
const router = Router();

//Definisco dove salvare i file
const upload = multer({ dest: "uploads/" });

//Creo una richiesta POST
router.post("/", upload.single("file"), async (req, res) => {

    //Per prima cosa controllo se è stato caricato un file, altrimenti restituisco un messaggio di errore
    if (!req.file) {

        return res.status(400).json({ error: "Nessun file caricato" });

    }

    //Salvo in una variabile il path del file caricato
    const filePath = req.file.path;

    //Leggo il contenuto del file
    const content = fs.readFileSync(filePath, "utf-8");

    //Salvo in una variabile il testo chunkato
    const chunks = chunkText(content);

    //Salvo in una variabile gli embeddings creati dai testi chunkati
    const embeddedChunks = await getEmbeddings(chunks);

    console.log("Chunks:", chunks);
    console.log("Numero chunk:", chunks.length);

    //Stampo il primo embedding
    console.log("Primo embedding:", embeddedChunks[0]);

    //Stampo nel log ciò che viene letto nel file
    console.log("Contenuto file:", content);

    //Appena il file viene caricato, restituisco un messaggio di avvenuto caricamento e anche la lunghezza del contenuto del file
    res.json({
        message: "File ricevuto correttamente ✅",
        contentLength: content.length,
    });
});

export default router;