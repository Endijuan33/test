import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES } from './schema';

const db = SQLite.openDatabase('konterapp.db');

export const initDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      CREATE_TABLES.forEach(query => {
        tx.executeSql(query, [], 
          () => {}, 
          (_, error) => reject(error)
        );
      });
    }, reject, resolve);
  });
};

export default db;
