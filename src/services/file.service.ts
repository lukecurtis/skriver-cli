import chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';

export class FileService {
  async createProject(title: string, languageCode: string) {
    const root = path.join(process.cwd(), title);

    if (await fs.pathExists(root)) {
      throw new Error(`Directory already exists: ${root}`);
    }

    // Create base folders
    await fs.ensureDir(path.join(root, 'works'));
    await fs.ensureDir(path.join(root, 'bible'));

    // Create the global config
    const config = {
      schema: 'skriver.project.v1',
      name: title,
      default_language: languageCode,
      works_dir: 'works',
      bible_dir: 'bible',
    };

    await fs.writeJson(path.join(root, 'skriver.json'), config, { spaces: 2 });
    console.log(chalk.green(`Project "${title}" created at ${root}`));
  }

  async createWork(workId: string, title: string) {
    if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(workId)) {
      throw new Error(
        'Invalid work_id. Use lowercase letters, numbers, and hyphens (max 64 chars).'
      );
    }

    const worksRoot = path.join(process.cwd(), 'works');
    const workRoot = path.join(worksRoot, workId);

    if (!(await fs.pathExists(worksRoot))) {
      throw new Error('Missing works/ directory. Are you in a Skriver project?');
    }

    if (await fs.pathExists(workRoot)) {
      throw new Error(`Work already exists: ${workId}`);
    }

    await fs.ensureDir(path.join(workRoot, 'manuscript'));
    await fs.ensureDir(path.join(workRoot, 'context'));

    const config = {
      schema: 'skriver.work.v1',
      id: workId,
      title,
      manuscript_dir: 'manuscript',
      context_dir: 'context',
    };

    await fs.writeJson(path.join(workRoot, 'work.json'), config, { spaces: 2 });
    console.log(chalk.green(`Work "${title}" created at ${workRoot}`));
  }
}
