import intance from './request.js';

var requestcate = intance({
	url: "/api/goods",
	method: "get"
});

export function requstgoods(category,order='sales') {
	var goods;
	if(category==''){
		goods = intance({
			url: "/api/goods?" + order + "=1",
		});
	}
	else {
		goods = intance({
			url: "/api/goods?category_id=" + category + "&" + order + "=1",
		});
	}
	
	return goods
}

export default requestcate

