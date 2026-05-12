import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

interface RegistryEntry {
  name: string;
  description: string;
  category: string;
  files: { path: string; content: string }[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}

interface RegistryIndex {
  components: RegistryEntry[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getRegistryPath(): string {
  return path.resolve(__dirname, '../../registry.json');
}

export async function listComponents(): Promise<void> {
  const registryPath = getRegistryPath();
  if (!fs.existsSync(registryPath)) {
    console.log(chalk.red('Registry not found. Run this from the vibekit-native package.'));
    return;
  }

  const registry: RegistryIndex = await fs.readJson(registryPath);
  const categories = new Set(registry.components.map((c) => c.category));

  console.log(chalk.bold('\n  VibeKit Native — Available Components\n'));

  for (const category of categories) {
    console.log(chalk.cyan(`  ${category}:`));
    const comps = registry.components.filter((c) => c.category === category);
    for (const c of comps) {
      console.log(`    ${chalk.white(c.name.padEnd(30))} ${chalk.gray(c.description)}`);
    }
    console.log('');
  }

  console.log(chalk.dim(`  Total: ${registry.components.length} components\n`));
}

export async function installComponent(
  name: string,
  projectPath: string,
  skipConfirm: boolean,
): Promise<void> {
  const registryPath = getRegistryPath();
  if (!fs.existsSync(registryPath)) {
    console.log(chalk.red('Registry not found.'));
    process.exit(1);
  }

  const registry: RegistryIndex = await fs.readJson(registryPath);
  const entry = registry.components.find(
    (c) => c.name === name || c.name.toLowerCase() === name.toLowerCase(),
  );

  if (!entry) {
    console.log(chalk.red(`Component "${name}" not found.`));
    console.log(chalk.gray('Run `npx vibekit-native list` to see all available components.'));
    process.exit(1);
  }

  const targetDir = path.resolve(projectPath);
  if (!fs.existsSync(targetDir)) {
    console.log(chalk.red(`Project directory "${projectPath}" not found.`));
    process.exit(1);
  }

  const hasPackageJson = fs.existsSync(path.join(targetDir, 'package.json'));
  if (!hasPackageJson) {
    console.log(chalk.red('No package.json found. Are you in an Expo project?'));
    process.exit(1);
  }

  // Determine component directory
  const compDir = path.join(targetDir, 'src', 'components', entry.category);
  fs.ensureDirSync(compDir);

  // Show info
  console.log(chalk.bold(`\n  Installing: ${chalk.cyan(entry.name)}`));
  console.log(`  ${chalk.gray(entry.description)}`);
  console.log(`  Target: ${chalk.dim(path.relative(targetDir, compDir))}\n`);

  if (!skipConfirm) {
    const { default: inquirer } = await import('inquirer');
    const { confirm } = await inquirer.prompt([
      { type: 'confirm', name: 'confirm', message: 'Continue?', default: true },
    ]);
    if (!confirm) {
      console.log(chalk.yellow('Cancelled.'));
      process.exit(0);
    }
  }

  // Install dependencies
  if (entry.dependencies && entry.dependencies.length > 0) {
    const depSpinner = ora('Installing dependencies...').start();
    try {
      const { execa } = await import('execa');
      await execa('npx', ['expo', 'install', ...entry.dependencies], {
        cwd: targetDir,
        stdio: 'pipe',
      });
      depSpinner.succeed('Dependencies installed');
    } catch {
      depSpinner.warn('Could not auto-install dependencies. Install manually:');
      console.log(chalk.gray(`  npx expo install ${entry.dependencies.join(' ')}`));
    }
  }

  // Write component files
  const fileSpinner = ora('Writing component files...').start();
  for (const file of entry.files) {
    const filePath = path.join(compDir, path.basename(file.path));
    await fs.writeFile(filePath, file.content);
  }
  fileSpinner.succeed(`Files written to ${chalk.cyan(path.relative(targetDir, compDir))}`);

  // Install registry dependencies
  if (entry.registryDependencies && entry.registryDependencies.length > 0) {
    console.log(chalk.dim('\n  Also install these peer components:'));
    for (const dep of entry.registryDependencies) {
      console.log(chalk.gray(`    npx vibekit-native install ${dep}`));
    }
  }

  console.log(chalk.green(`\n  ✓ ${entry.name} installed successfully!\n`));
}
