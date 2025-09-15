interface IngredientChipProps {
  label: string;
  onRemove: () => void;
}

export default function IngredientChip({
  label,
  onRemove,
}: IngredientChipProps) {
  return (
    <div>
      <span>{label}</span>
      <button onClick={onRemove}>x</button>
    </div>
  );
}
