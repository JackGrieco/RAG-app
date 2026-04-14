//Funzione per testare il backend
export async function testBackend() {

    //Faccio una richiesta HTTP al backend, all'endpoint "test", e salvo nella variabile "res" la risposta HTTP
    const res = await fetch("http://localhost:3000/test");

    //Qui prendo il body della risposta e lo converto da JSON a oggetto JavaScript
    const data = await res.json();

    //Restituisco il message contenuto nel body
    return data.message;

}