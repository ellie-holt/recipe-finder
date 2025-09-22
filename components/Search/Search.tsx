"use client";

import { useRef, useState } from "react";
import { useButton } from "react-aria";
import SearchInput from "./SearchInput/SearchInput";
import ChipList from "./ChipList/ChipList";
import styles from "./Search.module.scss";

interface SearchProps {
  onSearch: (ingredients: string[]) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = (ingredient: string) => {
    const newIngredient = ingredient.trim().toLowerCase();
    if (!newIngredient || ingredients.includes(newIngredient)) return;
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: () => onSearch(ingredients),
    },
    buttonRef
  );

  return (
    <div className={styles.container}>
      <SearchInput
        onAdd={addIngredient}
        onBackspaceAtStart={() => {
          if (ingredients.length > 0) {
            removeIngredient(ingredients[ingredients.length - 1]);
          }
        }}
      />
      <ChipList ingredients={ingredients} onRemove={removeIngredient} />
      <button {...buttonProps} ref={buttonRef} className={styles.searchButton}>
        Search Recipes
      </button>
    </div>
  );
}
