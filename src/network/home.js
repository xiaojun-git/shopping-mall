import intance from './request.js';


var requestOne = intance({
	url: "/api/index",
	method: "get"
});

export function requstgoods(type='sales',page=1) {
	var goods = intance({
		url: "/api/index?" + type + "=1&page=" +page,
	});
	return goods
}



export default requestOne
