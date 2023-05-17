import {config} from "../config/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { loadFiles } from "@graphql-tools/load-files";
import { tools } from "../libs/tools";


const app = express();
const httpServer =http.createServer(app);


const server = new ApolloServer({
    typeDefs: await loadFiles('src/typeDefs/**/*.graphql'),
    resolvers: await loadFiles('src/resolvers/**/*.{js,ts}'),
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})],
});

await server.start();

app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server,
    {
        context: async ({ req }) => {
            let token = req.headers.authorization||'';
            let currentUser = await tools.auth(token);
            return{token,currentUser};
           },
    }
    )
)

await new Promise<void>((resolve)=> httpServer.listen(
    {port:config.PORT},
    resolve
));

console.log(`🚀 Server ready at http://${config.HOST}:${config.PORT}/`);