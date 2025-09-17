import { Recipe } from "@/types/recipe";
import styles from "./RecipeCard.module.scss";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  );
}
