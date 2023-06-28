import React, { useEffect, useState } from 'react';
import { View, Button, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../service/Register';


const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const register = registerUser(username, email, password);
    if(register){
      navigation.navigate("Login");
    }else{
      navigation.navigate("Register");
    }
    
  }

  const handleLogin = () => {
    const register = registerUser(username, email, password);
      navigation.navigate("Login");
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="Sign up" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default RegisterScreen;