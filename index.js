const { createSocket } = require('dgram');
const pretty = require('./lib/pretty');
const time = require('./lib/time');

/**
 * Listen on a UDP port and print results
 * @param  {string}   [options.port='8125']
 * @param  {string}   [options.address='127.0.0.1']
 * @param  {string}   [options.encoding='utf8']
 * @param  {function} [options.log=console.log]
 * @returns {void}
 */
module.exports = ({
	port = '8125',
	address = '127.0.0.1',
	encoding = 'utf8',
	log = console.log,
} = {}) => new Promise(
	(resolve, reject) => {
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
