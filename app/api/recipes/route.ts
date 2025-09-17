import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { ingredients } = await request.json();

  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
    ","
  )}&number=6&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}
