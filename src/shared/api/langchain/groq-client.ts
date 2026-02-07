import { ChatGroq } from "@langchain/groq";


export interface AIResponse {
  text: string;
  usage?: object;
}

const model = new ChatGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

export const askGroq = async (prompt: string): Promise<AIResponse> => {
  const response = await model.invoke(prompt);
  return {
    text: response.content as string,
  };
};