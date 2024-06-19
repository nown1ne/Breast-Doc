import type { APIRoute } from "astro";
import { model } from "../../lib/gemini";

export const POST: APIRoute = async ({ request }) => {
  const { prompt, blogContent } = await request.json();

  if (!prompt || !blogContent) {
    return new Response("Prompt and blog content are required", {
      status: 400,
    });
  }

  try {
    const result = await model.generateContent(
      `You are an expert doctor. Please take the following content into account: ${blogContent} ${prompt}`
    );
    const response = await result.response;
    const answer = await response.text();

    return new Response(answer, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return new Response("Error generating response", {
      status: 500,
    });
  }
};