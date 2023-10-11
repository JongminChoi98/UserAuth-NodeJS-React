import { AppDataSource } from "../../db/dataSource";

export const signup = async (name, email, password) => {
  try {
    await AppDataSource.query(
      `
        INSERT INTO users (
          name,
          email,
          password
        ) VALUES (?, ?, ?);
        `,
      [name, email, password]
    );
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const deleteUser = async (userId) => {
  try {
    await AppDataSource.query(
      `
        DELETE FROM users
        WHERE id = ${userId}
      `
    );
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
