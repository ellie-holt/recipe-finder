"use client";

import { useState } from "react";
import IngredientChip from "./IngredientChip";

export default function SearchBar() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    const newIngredient = inputValue.trim().toLowerCase();
    if (!newIngredient || ingredients.includes(newIngredient)) return;
    setIngredients([...ingredients, newIngredient]);
    setInputValue("");
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter an ingredient"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button onClick={addIngredient}>Add</button>
      </div>

      {ingredients.map((ingredient) => (
        <IngredientChip
          key={ingredient}
          label={ingredient}
          onRemove={() => removeIngredient(ingredient)}
        />
      ))}
    </div>
  );
}
