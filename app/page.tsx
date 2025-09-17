"use client";

import { useState } from "react";
import { SearchBar } from "@/components/Search";
import { RecipeCard } from "@/components/Recipes";

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
    <section>
      <h2>What's in your fridge? </h2>
      <p>
        Type in your ingredients and discover recipes you can cook right now.
      </p>
      <SearchBar onSearch={searchRecipes} />

      <div>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
