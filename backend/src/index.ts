import "dotenv/config";
import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";

//Creo la mia applicazione Express
const app = express();

//Attivo cors, ossia una regola che permette al frontend di fare richiesta al backend anche se girano su origini diverse (es. backend: http://localhost:3000; frontend: http://localhost:5173)
app.use(cors());
//Questo serve ad express così che se arriva una richiesta con body in formato JSON, viene trasformata automaticamente in oggetto JS
app.use(express.json());

//Endpoint per richiesta GET HTTP di tipo "test"
app.get("/test", (req, res) => { //"req" = tutto quello che il client manda; "res" = tutto quello che il server manda indietro

  //Mando il response in formato JSON con un message
  res.json({ message: "Backend funzionante 🚀" });

});

//Quando il server riceve richieste all'endpoint "upload", richiamo la route "uploadRoute"
app.use("/upload", uploadRoute);

//Questo avvia il server su porta 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
