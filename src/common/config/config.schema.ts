import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  PORT: number;
  SALT: string;
  STATIC_DIRECTORY_PATH: string;
  UPLOAD_DIRECTORY: string;
  HOST: string;
  JWT_SECRET: string;
};

export const configSchema = convict<ConfigSchema>({
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: 'String',
    env: 'DB_NANE',
    default: 'six-cities-simple-3-restapi',
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_USER: {
    doc: 'Username to connect to the database (MongoDB)',
    format: 'String',
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database (MongoDB)',
    format: 'String',
    env: 'DB_PASSWORD',
    default: null,
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
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory for static resources',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: 'static',
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  HOST: {
    doc: 'Host were started service',
    format: String,
    env: 'HOST',
    default: 'localhost',
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  }
});
