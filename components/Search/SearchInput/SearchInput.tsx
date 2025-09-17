"use client";

import { useState } from "react";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  onAdd: (ingredient: string) => void;
}

export default function SearchInput({ onAdd }: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };
  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        placeholder="Enter an ingredient"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button className={styles.addButton} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
