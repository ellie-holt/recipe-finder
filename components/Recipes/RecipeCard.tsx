interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    image: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  );
}
