import { createMultipleDocs, findNearestMatch } from '../services/DocumentService.js';
import { createEmbiddings, getChatCompletion } from '../services/OpenaiService.js'

export async function createDocs(req, res) {
    try {
        const data = createMultipleDocs();
        res.json({ data })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function queryDocs(req, res) {
    const { text } = req.body;

    try {
        const embedding = await createEmbiddings(text);
        const match = await findNearestMatch(embedding);
        const message = await getChatCompletion(match, text)

        res.json({ message })
    } catch (error) {
        res.status(500).send(error.message)
    }
}