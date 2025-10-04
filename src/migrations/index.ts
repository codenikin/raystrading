import * as migration_20250926_160735 from './20250926_160735';
import * as migration_20251004_200657 from './20251004_200657';

export const migrations = [
  {
    up: migration_20250926_160735.up,
    down: migration_20250926_160735.down,
    name: '20250926_160735',
  },
  {
    up: migration_20251004_200657.up,
    down: migration_20251004_200657.down,
    name: '20251004_200657'
  },
];
