const output = ["-- Multiplication Table of 5 --", ""];

for (let multiplier = 1; multiplier <= 5; multiplier++) {
	output.push(`5 x ${multiplier} = ${5 * multiplier}`, "");
}

output.push("-- First number > 10 divisible by 6 --", "");

let number = 11;
let firstDivisibleNumber;
while (true) {
	if (number > 10 && number % 6 === 0) {
		firstDivisibleNumber = number;
		break;
	}
	number++;
}
output.push(`Found: ${firstDivisibleNumber}`);

const oddNumbers = [];
let doWhileNumber = 0;
do {
	doWhileNumber++;
	if (doWhileNumber % 2 === 0) {
		continue;
	}
	oddNumbers.push(doWhileNumber);
} while (doWhileNumber < 5);

console.log(output.join("\n"));
