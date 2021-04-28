import intance from './request.js';

export function requstdetall(id) {
	var goods = intance({
		url: "/api/goods/" + id ,
	});
	return goods
}




