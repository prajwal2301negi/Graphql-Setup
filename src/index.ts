import express, { query } from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';



async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());


    // Creating Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
                say(name: String): String
        }
        `, // Schema 
        resolvers: {
            Query:{
              hello: () => 'Hello, World!',
              say: (_, {name}: {name:string}) => `Hey ${name}, How are you`,
            },
        }, // Logic
    })

    // Starting gql server
    await gqlServer.start();


    app.get('/', (req, res) => {
        res.json({
            message: "Server is up and running"
        })
    })

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
}
init()