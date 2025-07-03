import { client } from "./mongo-client.js";

const getCollection = async () => {
    await client.connect();
    const dbName = "voz-ativa";
    const mongoClient = client.db(dbName);
    return mongoClient.collection('alertas');
}

export const createAlerta = async ({ estado, cidade, tipo, coordenadas, titulo, descricao, username, data }) => {
    const collection = await getCollection();
    await collection.insertOne({ estado, cidade, tipo, coordenadas, titulo, descricao, username, data });
    await client.close()
}
