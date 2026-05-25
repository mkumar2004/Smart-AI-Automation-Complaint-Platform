import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const aiDir = join(root, 'smart-ai-service');
const isWin = process.platform === 'win32';
const venvPython = join(aiDir, '.venv', isWin ? 'Scripts/python.exe' : 'bin/python');

if (!existsSync(venvPython)) {
  console.error('\n[smart-ai-service] Virtual env not found. Run first:\n');
  console.error('  npm run setup:ai\n');
  process.exit(1);
}

const args = [
  '-m',
  'uvicorn',
  'main:app',
  ...(process.argv.includes('--prod') ? [] : ['--reload']),
  '--host',
  '0.0.0.0',
  '--port',
  '8000',
];

const child = spawn(venvPython, args, {
  cwd: aiDir,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => process.exit(code ?? 1));
