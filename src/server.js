import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';

const PORT = process.env.PORT;
dotenv.config();
export const setupServer = () =>{
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        })
    );

    app.get('/', (req, res) => {
        res.json({
            message: `Server is running on port ${PORT}`,
        });
    });

    app.use(contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};