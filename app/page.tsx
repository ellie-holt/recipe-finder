"use client";

import { useState } from "react";
import Link from "next/link";
import Search from "@/components/Search/Search";
import RecipeGrid from "@/components/Recipes/RecipeGrid";
interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const searchRecipes = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();
    setRecipes(Array.isArray(data) ? data : []);
  };

  return (
    <div>
      {/* Search */}
      <section>
        <h1>
          <Link href="/">🥕 What's in Your Fridge?</Link>
        </h1>
        <p>
          Type in your ingredients and discover recipes you can cook right now.
        </p>
        <Search onSearch={searchRecipes} />
      </section>
      {/* Recipes */}
      <section>
        {recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <p className="placeholder">
            No recipes yet — try adding some ingredients!
          </p>
        )}
      </section>
    </div>
  );
}
