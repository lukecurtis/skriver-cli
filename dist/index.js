#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const file_service_1 = require("./services/file.service");
const program = new commander_1.Command();
const fileService = new file_service_1.FileService();
program.name('skriver').version('0.1.0').description('Prose-as-Code CLI for writers');
program
    .command('init <title>')
    .action((title) => {
    console.log(chalk_1.default.green(`Initializing new Skriver project: ${title}...`));
})
    .action(async (title) => {
    await fileService.createProject(title);
});
program.parse(process.argv);
