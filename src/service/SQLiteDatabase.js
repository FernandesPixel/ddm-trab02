import * as SQLite from 'expo-sqlite'

//serviço de config do SQLite

const databaseName = 'mydatabase.db';

export const db = SQLite.openDatabase('mydatabase.db');

db.closeDatabase = () =>  {
    if (db) {
      db.close();
    }  
};

//cria tabela
export const setupDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
          [],
          () => {
            console.log('Banco de dados configurado');
            resolve(db);
          },
          (_, error) => {
            console.error('Erro ao configurar o banco de dados', error);
            reject(error);
          }
        );
      });
    });
  };
  
  //executa sql
  db.executeSql = (sqlStatement, params) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          params,
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };  

export default db