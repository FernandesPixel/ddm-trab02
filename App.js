import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { setupDatabase } from './src/service/SQLiteDatabase';

import MainStack from './src/navigator/Main';

const App = () => {

  useEffect(() => {
    setupDatabase()
      .then(db => {
        console.log('Banco de dados configurado');
      })
      .catch(error => {
        console.error('Erro ao configurar o banco de dados', error);
      });
  }, []);
  

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
