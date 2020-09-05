/**
 * Get formatted time
 * @return {string}
 */
module.exports = function time() {
	const date = new Date();

	return [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	].join(':');
};
