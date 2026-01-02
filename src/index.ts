#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();

program
  .name("skriver")
  .version("0.1.0")
  .description("Prose-as-Code CLI for writers");

program.command("init <title>").action((title) => {
  console.log(chalk.green(`Initializing new Skriver project: ${title}...`));
});

program.parse(process.argv);
