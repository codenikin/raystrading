import * as migration_20250926_160735 from './20250926_160735';

export const migrations = [
  {
    up: migration_20250926_160735.up,
    down: migration_20250926_160735.down,
    name: '20250926_160735'
  },
];
