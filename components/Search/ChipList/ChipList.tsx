import IngredientChip from "../IngredientChip/IngredientChip";
import styles from "./ChipList.module.scss";

interface ChipListProps {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

export default function ChipList({ ingredients, onRemove }: ChipListProps) {
  return (
    <div className={styles.chipList}>
      {ingredients.map((ingredient) => (
        <IngredientChip
          key={ingredient}
          label={ingredient}
          onRemove={() => onRemove(ingredient)}
        />
      ))}
    </div>
  );
}
