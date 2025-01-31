import { Document } from "../models/document.js";
import { podcasts } from "../utils/content.js";
import { createEmbiddings } from "./OpenaiService.js";

export async function createMultipleDocs() {

    const embeddings = await Promise.all(
        podcasts.map(async (content) => {
            const embedding = await createEmbiddings(content)
            return { content, embedding }
        }));

    return await Document.bulkCreate(embeddings);
}

export async function findNearestMatch(embedding) {
    const result = await Document.rpc('match_documents', {
        query_embedding: `[${embedding}]`,
        match_threshold: 0.50,
        match_count: 1
    });

    return result[0].content
}