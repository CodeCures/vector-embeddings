import { config } from "dotenv";
import OpenAI from "openai";

config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function createEmbiddings(input) {
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input
    })

    return embedding.data[0].embedding;
}

export async function getChatCompletion(text, query) {
    const messages = [
        {
            role: 'system',
            content: `You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`
        },
        {
            role: 'user',
            content: `Context: ${text} Question: ${query}`
        }
    ];

    const completions = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.5,
        frequency_penalty: 0.5
    })

    return completions.choices[0].message.content
}