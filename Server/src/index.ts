import express, { Express } from 'express';
import cors from 'cors';
import folderRoutes from "./routers/folderRoute";

const app: Express = express();

app.use(cors());
app.use("/", folderRoutes);;

app.listen(3001, () => {
    console.log(`Server is running on port number ${3001}`);
});

