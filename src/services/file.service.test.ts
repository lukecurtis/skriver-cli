import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { FileService } from './file.service';

describe('FileService', () => {
  const fileService = new FileService();
  let tempRoot: string;
  let originalCwd: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'skriver-test-'));
    process.chdir(tempRoot);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.remove(tempRoot);
  });

  it('creates a new project with the expected structure', async () => {
    await fileService.createProject('my-project', 'en');

    const projectRoot = path.join(tempRoot, 'my-project');
    await expect(fs.pathExists(path.join(projectRoot, 'works'))).resolves.toBe(true);
    await expect(fs.pathExists(path.join(projectRoot, 'bible'))).resolves.toBe(true);

    const config = await fs.readJson(path.join(projectRoot, 'skriver.json'));
    expect(config).toMatchObject({
      schema: 'skriver.project.v1',
      name: 'my-project',
      default_language: 'en',
      works_dir: 'works',
      bible_dir: 'bible',
    });
  });

  it('rejects creating a project when the directory already exists', async () => {
    await fs.ensureDir(path.join(tempRoot, 'my-project'));

    await expect(fileService.createProject('my-project', 'en')).rejects.toThrow(
      /Directory already exists/
    );
  });

  it('creates a work inside an existing project', async () => {
    await fileService.createProject('my-project', 'en');
    process.chdir(path.join(tempRoot, 'my-project'));

    await fileService.createWork('the-winter-gate', 'The Winter Gate');

    const workRoot = path.join(tempRoot, 'my-project', 'works', 'the-winter-gate');
    await expect(fs.pathExists(path.join(workRoot, 'manuscript'))).resolves.toBe(true);
    await expect(fs.pathExists(path.join(workRoot, 'context'))).resolves.toBe(true);

    const config = await fs.readJson(path.join(workRoot, 'work.json'));
    expect(config).toMatchObject({
      schema: 'skriver.work.v1',
      id: 'the-winter-gate',
      title: 'The Winter Gate',
      manuscript_dir: 'manuscript',
      context_dir: 'context',
    });
  });

  it('rejects invalid work ids', async () => {
    await expect(fileService.createWork('Invalid Id', 'Bad')).rejects.toThrow(/Invalid work_id/);
  });

  it('rejects creating a work when works directory is missing', async () => {
    await expect(fileService.createWork('the-winter-gate', 'The Winter Gate')).rejects.toThrow(
      /Missing works\/ directory/
    );
  });

  it('rejects creating a work when it already exists', async () => {
    await fileService.createProject('my-project', 'en');
    process.chdir(path.join(tempRoot, 'my-project'));
    await fileService.createWork('the-winter-gate', 'The Winter Gate');

    await expect(fileService.createWork('the-winter-gate', 'The Winter Gate')).rejects.toThrow(
      /Work already exists/
    );
  });
});
