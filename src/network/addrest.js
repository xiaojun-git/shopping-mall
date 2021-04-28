import intance from './request.js';

export function addaddrest(params) {
	var goods = intance({
		url: "/api/address" ,
        method: 'post',
        data:params
	});
	return goods
}

export function updateaddrest(id,params) {
	var goods = intance({
		url: "/api/address/" + id,
        method: 'put',
        data:params
	});
	return goods
}

export function deleteaddrest(id) {
	var goods = intance({
		url: "/api/address/" + id,
        method: 'DELETE',
	});
	return goods
}

export function getaddrestlist() {
	var goods = intance({
		url: "/api/address" ,
        method: 'get',
	});
	return goods
}

export function addrestdetail(id) {
	var goods = intance({
		url: "/api/address/" + id,
        method: 'get',
	});
	return goods
}

