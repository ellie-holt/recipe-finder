"use client";

import { useState, useRef } from "react";
import { useTextField, useButton } from "react-aria";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  onAdd: (ingredient: string) => void;
  onBackspaceAtStart: () => void;
}

export default function SearchInput({
  onAdd,
  onBackspaceAtStart,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { inputProps } = useTextField(
    {
      placeholder: "Enter an ingredient",
      value: inputValue,
      onChange: setInputValue,
      autoFocus: true,
    },
    inputRef
  );

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();
      onBackspaceAtStart();
    }
  };

  const { buttonProps } = useButton(
    {
      onPress: handleAdd,
      "aria-label": "Add ingredient",
    },
    buttonRef
  );

  return (
    <div className={styles.searchInput}>
      <input {...inputProps} ref={inputRef} onKeyDown={handleKeyDown} />
      <button {...buttonProps} ref={buttonRef} className={styles.addButton}>
        Add
      </button>
    </div>
  );
}
