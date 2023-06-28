import { db } from './SQLiteDatabase';

//serviço de login
export const loginUser = async (email, password) => {
    try {
      const result = await db.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
  
      if (result.rows.length > 0) {
        console.log('Usuário logado com sucesso');
        return true;
      } else {
        console.log('Credenciais inválidas');
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
      return { success: false, message: 'Erro ao fazer login' };
    }
  };