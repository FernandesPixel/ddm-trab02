import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MainScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchData();
  }, []);

  //enpoint de receitas
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: '0',
      size: '20',
      tags: 'under_30_minutes'
    },
    headers: {
      'X-RapidAPI-Key': '08ee1263b4mshe427d15b114488cp190d7ajsn86b50e369774',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  //chama endpoint de receitas e adiciona resposta na lista
  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  //chama endpoint de tags e adiciona resposta em tags
  const fetchTags = async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/tags/list',
        headers: {
          'X-RapidAPI-Key': '08ee1263b4mshe427d15b114488cp190d7ajsn86b50e369774',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      });
      const tagsData = response.data.results.map(tag => tag.display_name);
      setTags(tagsData);
    } catch (error) {
      console.error(error);
    }
  };

  //manipula evento de seleção de uma tag no combobox
  const handleTagSelection = async (tag) => {
    setSelectedTag(tag);
    try {
      const recipesResponse = await axios.request({
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {
          from: '0',
          size: '20',
          tags: tag.name
        },
        headers: {
          'X-RapidAPI-Key': '08ee1263b4mshe427d15b114488cp190d7ajsn86b50e369774',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      });
      console.log(recipesResponse.data.results);
      setData(recipesResponse.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  //renderiza cards de receitas
  const renderRecipeItem = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: item.thumbnail_url }}
        style={{ width: 300, height: 200 }}
      />
      <Text>{item.title}</Text>
      <Text>Servings: {item.num_servings}</Text>
      <Text>Cuisine: {item.tags.find(tag => tag.root_tag_type === 'cuisine')?.display_name}</Text>
      <Text>Difficulty: {item.tags.find(tag => tag.root_tag_type === 'difficulty')?.display_name}</Text>
      <TouchableOpacity onPress={() => navigateToRecipeDetails(item.id)}>
        <Text>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  //redireciona para a tela de detalhes da receita
  const navigateToRecipeDetails = (recipeId) => {
    navigation.navigate('ReceipeDetails', { recipeId });
  };

  return (
    <View>
      <Text>Receitas</Text>

      <Picker
        selectedValue={selectedTag}
        onValueChange={(itemValue) => handleTagSelection(itemValue)}
      >
        <Picker.Item label="Selecione uma tag" value="" />
        {tags.map((tag, index) => (
          <Picker.Item key={index} label={tag} value={tag} />
        ))}
      </Picker>

      <FlatList
        data={data}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


export default MainScreen;