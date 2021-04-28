import intance from './request.js';

export function requstuser(id) {
	var goods = intance({
		url: "/api/auth/register" ,
        method: 'post',
        data:id
	});
	return goods
}




