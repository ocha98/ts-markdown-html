/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  resolver: 'ts-jest-resolver',
  globals:{
    "ts-jest": {
      useESM: true,
      tsconfig: 'tsconfig.json',
    }
  }

};