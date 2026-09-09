import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, birthDate, zodiac, category } = body;

    if (!name || !birthDate || !zodiac || !category) {
      return NextResponse.json(
        {
          error: "Missing required information.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are MOO TODAY, a friendly, elegant, and mystical fortune guide.

Create a personalized fortune reading for this user.

Name: ${name}
Birth date: ${birthDate}
Zodiac sign: ${zodiac}
Fortune category: ${category}

Write the reading in English.

Requirements:
- 2-3 short paragraphs
- Warm, positive, and encouraging
- Make the reading feel personalized
- Give practical advice
- Keep it entertaining
- Do not claim supernatural certainty
- Do not make medical, financial, or legal guarantees
- Do not mention that you are an AI
- End with one short positive sentence

The style should feel:
- elegant
- magical
- modern
- warm
- premium
- suitable for MOO TODAY
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      fortune: response.output_text,
    });
  } catch (error) {
    console.error("========== AI FORTUNE ERROR ==========");
    console.error(error);
    console.error("======================================");

    return NextResponse.json(
      {
        error: "Unable to generate fortune.",
      },
      {
        status: 500,
      }
    );
  }
}