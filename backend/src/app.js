import express from 'express';
import router from './routes.js';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/images", express.static('images'))

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
