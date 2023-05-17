import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config(
    {
        path: path.resolve(__dirname,process.env.NODE_ENV+'.env')
    }
);

export const config={
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB: process.env.DB,
    SALTO_HASH: process.env.SALTO_HASH,
    SECRET_TOKEN: process.env.SECRET_TOKEN || ''
};