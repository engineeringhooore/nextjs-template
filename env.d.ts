declare namespace NodeJS {
  interface ProcessEnv {
    HOSTNAME: string;
    PORT: string;
    AUTH_TRUST_HOST: string;
    AUTH_SECRET: string;
  }
}
