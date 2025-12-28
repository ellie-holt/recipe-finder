"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import rough from "roughjs";
import Search from "@/components/Search/Search";
import RecipeGrid from "@/components/Recipes/RecipeGrid";
import { RoughFrame } from "@/components/ui/RoughFrame";
import styles from "./page.module.scss";

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
    <div className={styles.pageContainer}>
      <h1>
        <Link href="/">What’s in your fridge?</Link>
      </h1>

      <div className={styles.contentContainer}>
        {/* Search */}
        <section className={styles.searchSection}>
          <div className={styles.searchPanels}>
            <RoughFrame
              className={styles.searchPromptPanel}
              frameInset={1}
              contentPadding={16}
              radius={12}
            >
              <div className={styles.searchPromptContent}>
                <p>
                  Type in your ingredients and discover recipes you can cook
                  right now.
                </p>
                <RoughFrame
                  className={styles.handle}
                  frameInset={1}
                  contentPadding={1}
                  radius={5}
                  roughness={0.5}
                  strokeWidth={1.5}
                >
                  <div></div>
                </RoughFrame>
              </div>
            </RoughFrame>

            <RoughFrame
              className={styles.searchFormPanel}
              frameInset={1}
              contentPadding={16}
              radius={12}
            >
              <Search onSearch={searchRecipes} />
            </RoughFrame>
          </div>
        </section>

        {/* Recipes */}
        <section className={styles.recipesSection}>
          {recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} />
          ) : (
            <p className="placeholder">
              No recipes yet - try adding some ingredients!
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
