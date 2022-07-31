export const vars = {
  connectionString: process.env.CONNECTION_STRING || "",
  port: process.env.PORT || 3001,
  jwtKey: process.env.JWT_KEY,
  gcpKeyFile: process.env.GCP_KEY_FILE,
  gcpCredit: process.env.GCP_CRED,
  firebaseProjectId: process.env.PROJECT_ID,
  firebaseClientEmail: process.env.CLIENT_EMAIL,
  firebasePrivateKey: process.env.PRIVATE_KEY,
  firebaseStorageBucketName: process.env.BUCKET_NAME,
  signedCookie: process.env.SIGNED_COOKIE,
  originValue: process.env.ORIGIN_VALUE,
  environment: process.env.ENVIRONMENT
};
