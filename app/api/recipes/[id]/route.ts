import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const recipeId = Number(id);

  if (!Number.isInteger(recipeId) || recipeId <= 0) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/information`
  );
  url.searchParams.set("apiKey", apiKey);

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch recipe details from Spoonacular API" },
      { status: 502 }
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Spoonacular API returned an error",
        upstreamStatus: response.status,
        details: payload,
      },
      { status: 502 }
    );
  }

  return NextResponse.json(payload);
}
