export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  summary?: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image?: string;

  readyInMinutes?: number;
  servings?: number;

  extendedIngredients?: RecipeIngredient[];

  instructions?: string;
  analyzedInstructions?: RecipeInstructionGroup[];
}

export interface RecipeInstructionGroup {
  name: string;
  steps: RecipeInstructionStep[];
}

export interface RecipeInstructionStep {
  number: number;
  step: string;
  ingredients?: { id: number; name: string; image?: string }[];
  equipment?: { id: number; name: string; image?: string }[];
}
