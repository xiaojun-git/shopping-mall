import intance from './request.js';

export function requstlogin(id) {
	var goods = intance({
		url: "/api/auth/login" ,
        method: 'post',
        data:id
	});
	return goods
}

export function gotoout() {
	var goods = intance({
		url: "/api/auth/logout" ,
        method: 'post',
	});
	return goods
}



