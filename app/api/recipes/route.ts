import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  const ingredients = (body as any)?.ingredients;
  if (
    !Array.isArray(ingredients) ||
    ingredients.some((ing) => typeof ing !== "string")
  ) {
    return NextResponse.json(
      { error: "Ingredients must be an array of strings" },
      { status: 400 }
    );
  }

  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");
  url.searchParams.set("ingredients", ingredients.join(","));
  url.searchParams.set("number", "6");
  url.searchParams.set("apiKey", apiKey);

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch recipes from Spoonacular API" },
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
