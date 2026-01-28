"use client";

import { useEffect, useState } from "react";
import { RecipeDetails } from "@/types/recipe";
import styles from "./RecipeDetailsPanel.module.scss";

interface RecipeDetailsPanelProps {
  recipeId: number | null;
  onClose: () => void;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export default function RecipeDetailsPanel({
  recipeId,
  onClose,
}: RecipeDetailsPanelProps) {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recipeId === null) {
      setRecipeDetails(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isCurrent = true;

    const fetchRecipeDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const data = await response.json();

        if (!isCurrent) return;

        if (!response.ok) {
          setRecipeDetails(null);
          setError(data?.error ?? "Failed to fetch recipe details");
          return;
        }

        setRecipeDetails(data);
      } catch {
        if (!isCurrent) return;
        setRecipeDetails(null);
        setError("Failed to fetch recipe details");
      } finally {
        if (!isCurrent) return;
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();

    return () => {
      isCurrent = false;
    };
  }, [recipeId]);

  if (recipeId === null) return null;

  return (
    <aside className={styles.panel}>
      <button type="button" onClick={onClose} className={styles.close}>
        Close
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {isLoading && <p className={styles.loading}>Loading…</p>}

      {!isLoading && !error && recipeDetails && (
        <>
          <h2>{recipeDetails.title}</h2>
          {recipeDetails.image && (
            <img src={recipeDetails.image} alt={recipeDetails.title} />
          )}
          <h3>Summary</h3>
          {typeof recipeDetails.readyInMinutes === "number" && (
            <p>{recipeDetails.readyInMinutes} minutes</p>
          )}
          {typeof recipeDetails.servings === "number" && (
            <p>{recipeDetails.servings} servings</p>
          )}
          <h3>Ingredients</h3>
          <ul>
            {recipeDetails.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          {Array.isArray(recipeDetails.analyzedInstructions) &&
          recipeDetails.analyzedInstructions.length > 0 ? (
            <div>
              {recipeDetails.analyzedInstructions.map((group, groupIndex) => (
                <section key={groupIndex}>
                  {group.name ? <h4>{group.name}</h4> : null}

                  <ol>
                    {group.steps.map((s) => (
                      <li key={s.number}>{s.step}</li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          ) : recipeDetails.instructions ? (
            <p>{stripHtml(recipeDetails.instructions)}</p>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}{" "}
        </>
      )}
    </aside>
  );
}
