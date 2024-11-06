declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;

    UPLOAD_DEST: string;
    UPLOAD_LIMIT: number;
    ASSETS_URL: string;
    //
    JWT_SECRET: string;
  }
}
