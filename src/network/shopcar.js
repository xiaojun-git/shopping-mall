import intance from './request.js';

export function addshop(id) {
	var goods = intance({
		url: "/api/carts" ,
        method: 'post',
        data:id
	});
	return goods
}

export function showshop() {
	var goods = intance({
		url: "/api/carts/?include=goods" ,
        method: 'get',
	});
	return goods
}

export function changecar(id,num) {
	var goods = intance({
		url: "/api/carts/" + id,
        method: 'put',
		data:num
	});
	return goods
}

export function changechoice(id) {
	var goods = intance({
		url: "/api/carts/checked" ,
        method: 'patch',
		data:id
	});
	return goods
}

export function deletecar(id) {
	var goods = intance({
		url: "/api/carts/" + id,
        method: 'DELETE',
	});
	return goods
}




