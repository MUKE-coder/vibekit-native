import { Command } from 'commander';
import { listComponents, installComponent } from './installer.js';

const program = new Command();

program
  .name('vibekit-native')
  .description('Install VibeKit Native components into your Expo project')
  .version('0.1.0');

program
  .command('list')
  .description('List all available components')
  .action(() => listComponents());

program
  .command('install')
  .description('Install a component')
  .argument('<name>', 'Component name (e.g., button, product-card, login-screen)')
  .option('-p, --path <path>', 'Project root path', '.')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(async (name, options) => {
    await installComponent(name, options.path, options.yes);
  });

program.parse();
