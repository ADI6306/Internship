let inputInterface;
let inputClosed = false;
let inputQueue = [];
let waitingInputs = [];
let cliOutput;

if (typeof globalThis.prompt !== "function") {
	const { createInterface } = require("node:readline");
	const { stdin, stdout } = require("node:process");
	cliOutput = stdout;
	inputInterface = createInterface({ input: stdin, output: stdout });
	inputInterface.on("line", line => {
		const resolveInput = waitingInputs.shift();
		if (resolveInput) {
			resolveInput(line);
		} else {
			inputQueue.push(line);
		}
	});
	inputInterface.on("close", () => {
		inputClosed = true;
		for (const resolveInput of waitingInputs) {
			resolveInput(null);
		}
		waitingInputs = [];
	});
}

async function askUser(message) {
	if (typeof globalThis.prompt === "function") {
		return globalThis.prompt(message);
	}
	cliOutput.write(`${message} `);
	if (inputQueue.length > 0) {
		return inputQueue.shift();
	}
	if (inputClosed) {
		return null;
	}
	return new Promise(resolve => waitingInputs.push(resolve));
}

function getCategory(price) {
	let priceRange;
	if (price < 50) {
		priceRange = "low";
	} else if (price >= 200) {
		priceRange = "high";
	} else {
		priceRange = "middle";
	}

	switch (priceRange) {
		case "low":
			return "Budget";
		case "high":
			return "Premium";
		default:
			return "Standard";
	}
}

const inventory = [
	{ name: "Laptop", price: 800 },
	{ name: "Mouse", price: 25 }
].map(product => ({ ...product, category: getCategory(product.price) }));

async function collectProduct() {
	while (true) {
		const nameInput = await askUser("New product name:");
		if (nameInput === null) {
			console.log("Product entry canceled.");
			return null;
		}

		const name = nameInput.trim();
		if (!name) {
			console.log("Product name is required. Please try again.");
			continue;
		}

		let duplicateFound = false;
		for (const product of inventory) {
			if (product.name.toLowerCase() !== name.toLowerCase()) {
				continue;
			}
			duplicateFound = true;
			break;
		}
		if (duplicateFound) {
			console.log("That product is already in the inventory. Please enter a different name.");
			continue;
		}

		const priceInput = await askUser("New product price:");
		if (priceInput === null) {
			console.log("Product entry canceled.");
			return null;
		}

		const price = Number(priceInput);
		if (priceInput.trim() === "" || !Number.isFinite(price) || price < 0) {
			console.log("Enter a valid, non-negative price. Please try again.");
			continue;
		}

		return { name, price, category: getCategory(price) };
	}
}

function calculateInventoryValue(items, taxRate = 0, discountRate = 0) {
	let subtotal = 0;
	for (const item of items) {
		subtotal += item.price;
	}
	return applyTaxAndDiscount(subtotal, taxRate, discountRate);
}

const applyTaxAndDiscount = (amount, taxRate = 0, discountRate = 0) => {
	const discountedAmount = amount * (1 - discountRate);
	return discountedAmount * (1 + taxRate);
};

async function main() {
	console.log("--- Initializing Inventory System ---\n");
	const newProduct = await collectProduct();
	if (!newProduct) {
		return;
	}
	inventory.push(newProduct);
	console.log(`[Prompt executed: User adds \"${newProduct.name}\" at \"$${newProduct.price}\"]`);

	console.log("\n--- Processing Inventory Roster (forEach) ---\n");
	inventory.forEach(product => {
		console.log(`* Item: ${product.name} ($${product.price}) -> Category: ${product.category}\n`);
	});

	const totalValue = calculateInventoryValue(inventory);
	const affordableNames = inventory
		.filter(product => product.price < 200)
		.map(product => product.name);
	const formattedReport = inventory.map(
		product => `${product.name.toUpperCase()}: $${product.price}`
	);

	console.log("--- Financial Analytics ---\n");
	console.log(`Total Inventory Value: $${totalValue}\n`);
	console.log(`Filtered Affordable Items (Under $200): [${affordableNames.map(name => JSON.stringify(name)).join(", ")}]\n`);
	console.log(`Formatted Report List: [${formattedReport.map(item => JSON.stringify(item)).join(", ")}]`);
}

main()
	.catch(error => {
		console.error("Inventory system error:", error.message);
		if (typeof process !== "undefined") {
			process.exitCode = 1;
		}
	})
	.finally(() => {
		inputInterface?.close();
	});
