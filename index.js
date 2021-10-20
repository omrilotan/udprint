const { createSocket } = require('dgram');
const pretty = require('./lib/pretty');
const time = require('./lib/time');
const sender = require('./lib/sender');
const cleaner = require('./lib/cleaner');

const noop = () => null;

/**
 * Listen on a UDP port and print results
 * @param  {string}   [options.port='8125']
 * @param  {string}   [options.address='127.0.0.1']
 * @param  {string}   [options.encoding='utf8']
 * @param  {function} [options.log=console.log]
 * @param  {string}   [options.forward]
 * @param  {string}   [options.clean]
 * @returns {void}
 */
module.exports = ({
	port = '8125',
	address = '127.0.0.1',
	encoding = 'utf8',
	log = console.log,
	forward,
	clean,
	silent
} = {}) => new Promise(
	(resolve, reject) => {
		let send;
		let replace;
		if (forward) {
			if (forward.includes(':')) {
				send = sender(...forward.split(':'))
			} else {
				throw new RangeError('forward must include address and port (127.0.0.1:2003)')
			}
		}
		if (clean) {
			replace = cleaner(clean);
		}

		const socket = createSocket('udp4');

		socket.on('error', reject);

		socket.on('listening', () => {
			const { address, port } = socket.address();
			if (silent) { return resolve(); }
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
			if (replace) {
				message = replace(message.toString(encoding));
			}
			send?.(message);
			const output = pretty(message.toString(encoding));
			if (silent) { return; }
			log(
				[
					`Message received from ${address}:${port} on ${time()}`,
					output,
					Array.from({ length: 27 }).join('─'),
				].join('\n'),
			);
		});

		socket.bind(port, address);
	},
);
