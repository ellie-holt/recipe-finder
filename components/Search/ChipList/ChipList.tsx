import { useState, useRef, useEffect } from "react";
import IngredientChip from "../IngredientChip/IngredientChip";
import styles from "./ChipList.module.scss";

interface ChipListProps {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
}

export default function ChipList({ ingredients, onRemove }: ChipListProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex !== null) {
      chipRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleKeyNav = (index: number, key: string) => {
    if (key === "ArrowRight" && index < ingredients.length - 1) {
      setFocusedIndex(index + 1);
    } else if (key === "ArrowLeft" && index > 0) {
      setFocusedIndex(index - 1);
    } else if (key === "Delete" || key === "Backspace") {
      onRemove(ingredients[index]);
      setFocusedIndex((prev) =>
        prev !== null && prev >= ingredients.length - 1 ? prev - 1 : prev
      );
    }
  };

  const setChipRef = (index: number) => (element: HTMLButtonElement | null) => {
    chipRefs.current[index] = element;
  };

  return (
    <div
      className={styles.chipList}
      role="list"
      aria-label="Selected ingredients"
    >
      {ingredients.map((ingredient, index) => (
        <IngredientChip
          key={ingredient}
          label={ingredient}
          onRemove={() => onRemove(ingredient)}
          onKeyNav={(key) => handleKeyNav(index, key)}
          ref={setChipRef(index)}
          tabIndex={
            focusedIndex === index || (focusedIndex === null && index === 0)
              ? 0
              : -1
          }
          onFocus={() => setFocusedIndex(index)}
        />
      ))}
    </div>
  );
}
