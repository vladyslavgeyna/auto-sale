import "reflect-metadata";
import App from "./app";
import { saveCollection } from "./postman";

const PORT = Number(process.env.PORT) || 5000;

const app = new App(PORT);

app.start();
saveCollection();
