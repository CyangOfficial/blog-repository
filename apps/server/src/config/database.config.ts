export const database = () => {
  const { env } = process;
  const host = env.DATABASE_HOST;
  const port = Number(env.DATABASE_PORT);
  const userName = env.DATABASE_USERNAME;
  const passWord = env.DATABASE_PASSWORD;
  const dbName = env.DATABASE_NAME;
  const prefix = 'mongodb://';
  const auth = `${userName}:${passWord}@`;
  const mongoUrl = `${prefix}${host}:${port}/${dbName}`;
  return {
    mongoUrl,
  };
};

// import { registerAs } from '@nestjs/config'

// export default registerAs('database', () => {
//     const host = process.env.DATABASE_HOST
//     const port = process.env.DATABASE_PORT
//     const userName = process.env.DATABASE_USERNAME
//     const passWord = process.env.DATABASE_PASSWORD
//     const dbName = process.env.DATABASE_NAME
//     const prefix = 'mongodb://'
//     const auth = `${userName}:${passWord}@`
//     const mongoUrl = `${prefix}${host}:${port}/${dbName}`
//     return {
//         mongoUrl
//     }
// })
