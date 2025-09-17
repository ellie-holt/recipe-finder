import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard/RecipeCard";
import styles from "./RecipeGrid.module.scss";

interface RecipeGridProps {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
