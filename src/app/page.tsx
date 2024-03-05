"use client"; // Add this line at the top of your file

import React from 'react'; // Import React
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes'); // Corrected URL

  return result.json();
}

export default function Home() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]); // Use state to manage recipes

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const loadedRecipes = await getRecipes();
      setRecipes(loadedRecipes);
    };

    fetchRecipes();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/img${recipe.image}`} alt="recipe img" />
                <AvatarFallback>
                  {recipe.title.slice(0,2)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.time} mins to cook.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant={"secondary"}>Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
