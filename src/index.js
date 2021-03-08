const { interfaces } = require("mocha");

module.exports = function check(str, bracketsConfig) {
	let open = {};

	for (let item of bracketsConfig) {
		open[item[0]] = item[1];
	}

	let stack = [];

	for (let i = 0; i < str.length; i++) {
		let curr = str[i];

		if (open[curr]) {
			stack.push(curr);

			if (curr == '|' || curr == '7' || curr == '8' && stack.length > 0) {
				let prev = stack.pop();
				let pr = stack.pop();

				if (pr == undefined) {
					stack.push(curr);
				} else {
					if (prev != pr) {
						stack.push(pr);
						stack.push(curr);
					}
				}
			}
		} else {

			if (stack.length == 0) return false;

			let prev = stack.pop();

			if (curr != open[prev]) return false;
		}
	}

	if (stack.length > 0) return false;

	return true;
}
