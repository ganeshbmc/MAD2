let current=0, next=1, temp;

//In nodejs, we cannot do a prompt (because prompt is available only on a browser)
//In nodejs, we also cannot do an alert

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question('How many Fibonacci numbers do you need? ', series_count => {
	console.log('Fibonacci series: ');

for (let i=1; i<=series_count; i++) {
	console.log(current);
	temp = current + next;
	current = next;
	next = temp;
}
readline.close();
});
