import {AppDataSource} from "./persistance/typeorm/data-source";

// Inicializar la conexión
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};