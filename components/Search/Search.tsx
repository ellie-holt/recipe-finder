"use client";

import { useState } from "react";
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

  return (
    <div className={styles.container}>
      <SearchInput onAdd={addIngredient} />
      <ChipList ingredients={ingredients} onRemove={removeIngredient} />
      <button
        className={styles.searchButton}
        onClick={() => onSearch(ingredients)}
      >
        Search Recipes
      </button>
    </div>
  );
}
