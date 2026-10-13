const score = Number(prompt("Enter your test score:"));
let gradeBand;

if (score >= 90) {
	gradeBand = 9;
} else if (score >= 80) {
	gradeBand = 8;
} else if (score >= 70) {
	gradeBand = 7;
} else if (score >= 60) {
	gradeBand = 6;
} else {
	gradeBand = 5;
}

let grade;
switch (gradeBand) {
	case 9:
		grade = "A";
		break;
	case 8:
		grade = "B";
		break;
	case 7:
		grade = "C";
		break;
	case 6:
		grade = "D";
		break;
	default:
		grade = "F";
}

const status = score >= 60 ? "Passed" : "Failed";

console.log(`Score: ${score}\n\nGrade: ${grade}\n\nStatus: ${status}`);
