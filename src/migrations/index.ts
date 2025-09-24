import * as migration_20250924_054143_init from './20250924_054143_init';
import * as migration_20250924_060509_init from './20250924_060509_init';

export const migrations = [
  {
    up: migration_20250924_054143_init.up,
    down: migration_20250924_054143_init.down,
    name: '20250924_054143_init',
  },
  {
    up: migration_20250924_060509_init.up,
    down: migration_20250924_060509_init.down,
    name: '20250924_060509_init'
  },
];
