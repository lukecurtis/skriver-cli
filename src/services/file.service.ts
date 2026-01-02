import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';

export class FileService {
  async createProject(title: string) {
    const root = path.join(process.cwd(), title);

    // Create base folders
    await fs.ensureDir(path.join(root, 'manuscript'));
    await fs.ensureDir(path.join(root, 'notes'));

    // Create the global config
    const config = {
      projectTitle: title,
      createdAt: new Date().toISOString(),
      version: '1.0.0',
    };

    await fs.writeJson(path.join(root, 'skriver.json'), config, { spaces: 2 });
    console.log(chalk.green(`Project "${title}" created at ${root}`));
  }
}
