const payload = {
	cmd: 'start',
	opts: {
		speed: 60,
	},
};


export const makeWebSocketCall = () => {
	const wsocket = new WebSocket('ws://localhost:8081');

	wsocket.addEventListener('open', () => {
		wsocket.send(JSON.stringify(payload));
	});

	return wsocket;
};