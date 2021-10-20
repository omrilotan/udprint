/**
 * @param {string} pattern The content for the regular expression
 * @return {Function} A function that takes a string and cleans matches
 */
module.exports = function cleaner(pattern) {
	const expression = new RegExp(pattern, 'img');
	return message => message.replace(expression, '');
};
