import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});
