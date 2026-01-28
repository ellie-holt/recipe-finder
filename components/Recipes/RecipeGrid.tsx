import { RecipeSearchResult } from "@/types/recipe";
import { useState } from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import RecipeDetailsPanel from "./RecipeDetailsPanel/RecipeDetailsPanel";
import styles from "./RecipeGrid.module.scss";

interface RecipeGridProps {
  recipes: RecipeSearchResult[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <RecipeDetailsPanel
        recipeId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
