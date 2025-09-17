import styles from "./IngredientChip.module.scss";

interface IngredientChipProps {
  label: string;
  onRemove: () => void;
}

export default function IngredientChip({
  label,
  onRemove,
}: IngredientChipProps) {
  return (
    <div className={styles.chip}>
      <span>{label}</span>
      <button onClick={onRemove}>x</button>
    </div>
  );
}
