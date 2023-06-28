import { db } from './SQLiteDatabase';

//serviço de cadastro
export const registerUser = async (name, email, password) => {
    try {
      console.log("db:"+db);
      await db.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
      console.log('Usuário cadastrado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
      return false;
    }
  };