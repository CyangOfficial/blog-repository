export const configuration = () => ({
  port: Number(process.env.PORT),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresTime: process.env.JWT_EXPIRES_TIME,
  // tencent cos
  cosSecretId: process.env.COS_SECRET_ID,
  cosSecretKey: process.env.COS_SECRET_KEY,
  cosObjectKey: process.env.COS_OBJECT_KEY,
  cosBucket: process.env.COS_BUCKET,
  cosRegion: process.env.COS_REGION,
});
