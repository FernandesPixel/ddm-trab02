import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';

const RecipeDetailsScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [instructions, setInstructions] = useState([]);
  const [recipe, setRecipe] = useState([]);

  // Faz a chamada para o endpoint que retorna as instruções
  useEffect(() => {
    const fetchInstructions = async () => {
        try {
            const response = await axios.request(options);
            setRecipe(response.data);
            setInstructions(response.data.instructions);
        } catch (error) {
            console.error(error);
        }
    };

    fetchInstructions();
  }, [recipeId]);

  //endpoint de mais detalhes
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
    params: {id: recipeId},
    headers: {
      'X-RapidAPI-Key': '08ee1263b4mshe427d15b114488cp190d7ajsn86b50e369774',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  //renderiza as instruções
  const RecipeInstructions = ({ instructions }) => {
    return (
      <View>
        {instructions.map((instruction, index) => (
          <View key={index}>
            <Text>{instruction.display_text}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <Image
        source={{ uri: recipe.thumbnail_url }}
        style={{ width: 300, height: 200 }}
      />
      <Text>{recipe.title}</Text>
      <Text>Modo de preparo:</Text>
      <RecipeInstructions instructions={instructions} />
    </View>
  );
};

export default RecipeDetailsScreen;
