import { RecipeSearchResult } from "@/types/recipe";
import styles from "./RecipeCard.module.scss";

interface RecipeCardProps {
  recipe: RecipeSearchResult;
  onSelect: (id: number) => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onSelect(recipe.id)}
    >
      <h3 className={styles.title}>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
    </button>
  );
}
