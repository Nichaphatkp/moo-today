import { NextResponse } from "next/server";

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

    const fortuneMessages: Record<string, string> = {
      Career:
        "This is a good time to focus on your goals and take steady steps forward. Stay confident, pay attention to opportunities, and trust your ability to learn and adapt.",

      Finance:
        "Your financial energy encourages balance and thoughtful decisions. Avoid unnecessary spending, focus on your priorities, and look for ways to build greater stability.",

      Love:
        "Your relationship energy is open to meaningful connections. Be honest about your feelings, communicate clearly, and give genuine connections room to grow.",

      Health:
        "Your energy suggests taking better care of yourself and finding a healthy balance between work and rest. Small positive habits can make a meaningful difference.",
    };

    const fortune =
      fortuneMessages[category] ||
      "Today is a good opportunity to slow down, reflect, and move forward with confidence. Trust yourself and focus on the positive possibilities ahead.";

    return NextResponse.json({
      fortune,
    });
  } catch (error) {
    console.error("FORTUNE ERROR:", error);

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