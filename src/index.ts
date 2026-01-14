#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { FileService } from './services/file.service';

const program = new Command();
const fileService = new FileService();

program.name('skriver').version('0.1.0').description('Prose-as-Code CLI for writers');

program
  .command('init <title>')
  .option('-l, --lang <code>', 'Default language code', 'en')
  .action(async (title: string, options: { lang: string }) => {
    console.log(chalk.green(`Initializing new Skriver project: ${title}...`));
    try {
      await fileService.createProject(title, options.lang);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      console.error(chalk.red(message));
      process.exitCode = 1;
    }
  });

const workCommand = program.command('work').description('Manage works within a project');

workCommand
  .command('add <workId>')
  .option('-t, --title <title>', 'Work title')
  .action(async (workId: string, options: { title?: string }) => {
    const title = options.title ?? workId;
    console.log(chalk.green(`Adding work "${title}" (${workId})...`));
    try {
      await fileService.createWork(workId, title);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      console.error(chalk.red(message));
      process.exitCode = 1;
    }
  });

program.parse(process.argv);
