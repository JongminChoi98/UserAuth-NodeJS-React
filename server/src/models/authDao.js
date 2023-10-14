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

export const getUserByEmail = async (email) => {
  try {
    const [user] = await AppDataSource.query(
      `
        SELECT
          id,
          name,
          email,
          password
        FROM users
        WHERE email = ?
      `,
      [email]
    );

    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getUserById = async (userId) => {
  const [user] = await AppDataSource.query(
    `
      SELECT
          id,
          name,
          email
      FROM users
      WHERE id = ?
    `,
    [userId]
  );

  return user;
};
