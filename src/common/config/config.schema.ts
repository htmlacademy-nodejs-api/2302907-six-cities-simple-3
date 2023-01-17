import convict from 'convict';

export type ConfigSchema = {
  DB_HOST: string;
  PORT: number;
  SALT: string;
};

export const configSchema = convict<ConfigSchema>({
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  PORT: {
    doc: 'Port for incoming connection',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  }
});
