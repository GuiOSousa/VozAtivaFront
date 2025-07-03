import { client } from "./mongo-client.js";

const getCollection = async () => {
    await client.connect();
    const dbName = "voz-ativa";
    const mongoClient = client.db(dbName);
    return mongoClient.collection('usuarios');
}

export const createUsuario = async ({ username, email, senha, alertas }) => {
    const collection = await getCollection();
    await collection.insertOne({ username, email, senha, alertas });
    await client.close()
}
