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
    const [exists] = await AppDataSource.query(
      `
        SELECT CASE WHEN EXISTS
          (SELECT
              1
            FROM users
            WHERE email = '${email}'
          ) THEN 1 ELSE 0 END AS user;
      `
    );

    return +exists.user;
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
      WHERE id = ?`,
    [userId]
  );

  return user;
};
