#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

async function welcome() {
	chalkAnimation.rainbow('Who wants to be a millionaire ? \n');

	await sleep();

	console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I'm a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

async function askName() {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'What is your name?',
		default() {
			return 'Player';
		},
	});

	playerName = answers.player_name;
}

async function question1() {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'Javascript was created in 10 days then released on \n',
		choices: ['May 23rd, 1995', 'Jun 16rd, 1996', 'Dec 4th, 1995', 'Dec 17, 1995'],
	});

	return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}
async function question2() {
	const answers = await inquirer.prompt({
		name: 'question_2',
		type: 'list',
		message: 'Who created JavaScript? \n',
		choices: ['Brendan Eich', 'Douglas Crockford', 'John Resig'],
	});

	return handleAnswer(answers.question_2 == 'Brendan Eich');
}
async function question3() {
	const answers = await inquirer.prompt({
		name: 'question_3',
		type: 'list',
		message: 'Which one of the following also known as Conditional Expression \n',
		choices: [
			'Alternative to if-else',
			'Switch statement',
			'If-then-else statement',
			'immediate if',
		],
	});

	return handleAnswer(answers.question_3 == 'immediate if');
}
async function question4() {
	const answers = await inquirer.prompt({
		name: 'question_4',
		type: 'list',
		message: 'The "function" and " var" are known as: \n',
		choices: ['Keywords', 'Data types', 'Declaration statements', 'prototypes'],
	});

	return handleAnswer(answers.question_4 == 'Declaration statements');
}

async function handleAnswer(isCorrect) {
	const spinner = createSpinner('checking answer...').start();

	await sleep();

	if (isCorrect) {
		spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
	} else {
		spinner.error({ text: `☠️☠️☠️ Game over, you lose ${playerName}` });
		process.exit(1);
	}
}

async function winner() {
	console.clear();

	const msg = `Congrats, ${playerName}!\n $ 1 , 0 0 0 , 0 0 0`;

	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data));
	});
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();
