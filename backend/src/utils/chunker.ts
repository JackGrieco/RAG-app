//Esporto la funzione così da poterla utlizzare fuori
export function chunkText(text: string, size = 200) {

    //Creo un array vuoto dove andrò ad inserire i chunk
    const chunks: string[] = [];

    //Ciclo for che scorre il testo e lo divide in chunk
    for (let i = 0; i < text.length; i += size) {

        //Aggiungo il chunk all'array
        //Il testo viene "diviso" attraverso la funzione "slice" che prende in input la posizione iniziale e finale del testo da "tagliare"
        chunks.push(text.slice(i, i + size));

    }

    //Restituisco l'array di chunk
    return chunks;
}