// Ref: https://jestjs.io/docs/configuration

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*\\.(test|spec)\\.(t|j)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@client/(.*)': '<rootDir>/src/client/$1',
    '^@server/(.*)': '<rootDir>/src/server/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
