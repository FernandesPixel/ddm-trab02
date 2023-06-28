import React, { useEffect, useState } from 'react';
import { View, Button, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { loginUser } from '../service/Login';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //verifica se o usuário existe e redireciona
  const handleLogin = () => {
    const login = loginUser(email, password);
    if(login){
        navigation.navigate('Main');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;