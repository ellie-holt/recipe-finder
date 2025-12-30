import { forwardRef } from "react";
import { useButton } from "react-aria";
import styles from "./IngredientChip.module.scss";

interface IngredientChipProps {
  label: string;
  onRemove: () => void;
  onKeyNav: (key: string) => void;
  tabIndex: number;
  onFocus: () => void;
}

const IngredientChip = forwardRef<HTMLButtonElement, IngredientChipProps>(
  ({ label, onRemove, onKeyNav, tabIndex, onFocus }, ref) => {
    const { buttonProps } = useButton(
      {
        onPress: onRemove,
        "aria-label": `Remove ${label}`,
      },
      ref as React.RefObject<HTMLButtonElement>
    );

    return (
      <div className={styles.chip} role="listitem">
        <span>{label}</span>
        <button
          {...buttonProps}
          ref={ref}
          tabIndex={tabIndex}
          onFocus={onFocus}
          onKeyDown={(e) => onKeyNav(e.key)}
        ></button>
      </div>
    );
  }
);

export default IngredientChip;
