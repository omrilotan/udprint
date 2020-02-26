const { createSocket } = require('dgram');
const pretty = require('./lib/pretty');

/**
 * Listen on a UDP port and print results
 * @param  {Number} options.port
 * @param  {String} options.address
 * @param  {String} options.encoding
 * @return {void}
 */
module.exports = function udprint({
	port = 8125,
	address = '127.0.0.1',
	encoding = 'utf8',
	log = console.log,
} = {}) {
	return new Promise(
		function (resolve, reject) {

			const socket = createSocket('udp4');

			socket.on('error', reject);

			socket.on('listening', () => {
				const { address, port } = socket.address();

				log(
					[
						'udprint: UDP Socket listener.',
						`listening on ${address}:${port}`,
						'CTRL + C to shutdown',
					].join('\n'),
				);
				resolve();
			});

			socket.on('message', (message, remote) => {
				const { address, port } = remote;
				message = pretty(message.toString(encoding));

				log(
					[
						`Message received from ${address}:${port} on ${time()}`,
						message,
						Array.from({ length: 27 }).join('─'),
					].join('\n'),
				);
			});

			socket.bind(port, address);

		},
	);
};

/**
 * Get formatted time
 * @return {string}
 */
function time() {
	const date = new Date();

	return [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	].join(':');
}
