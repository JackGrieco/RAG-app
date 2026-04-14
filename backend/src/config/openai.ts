//INUTILE ESSENDO CHE NON HO IL BILLING ATTIVO PER OPENAI

import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});