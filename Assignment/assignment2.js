const subtotal = Number(prompt("Enter the bill amount:"));
const tipPercentage = Number(prompt("Enter the tip percentage:"));
const calculatedTip = subtotal * (tipPercentage / 100);
let totalAmount = subtotal;
totalAmount += calculatedTip;

console.log(`Subtotal: $${subtotal}\n` +
	`Tip Percentage: ${tipPercentage}%\n` +
	`Calculated Tip: $${calculatedTip}\n` +
	`Total Amount to Pay: $${totalAmount}`);
