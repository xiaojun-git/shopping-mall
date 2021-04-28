import intance from './request.js';

// 订单生成
export function CreateOrder(id) {
	var goods = intance({
		url: "/api/orders" ,
        method: 'POST',
        data:id
	});
	return goods
}

// 订单预览
export function lookOrder() {
	var goods = intance({
		url: "/api/orders/preview" ,
        method: 'GET',
	});
	return goods
}
// 获取订单列表
export function Orderlist(params) {
	var goods = intance({
		url: "/api/orders/",
        method: 'GET',
        params,
	});
	return goods
}
// 订单支付,获取二维码
export function Orderpay(id,params) {
	var goods = intance({
		url: "/api/orders/"+ id + "/pay" ,
        method: 'GET',
        params,
	});
	return goods
}
// 订单状态
export function PayOrderState(id) {
	var goods = intance({
		url: "/api/orders/"+ id + "/status" ,
        method: 'get',
	});
	return goods
}
// 订单详情
export function OrderDetail(id) {
	var goods = intance({
		url: "/api/orders/" + id,
        method: 'get',
        params: {
            include: 'user,goods,orderDetails'
        }
	});
	return goods
}
// 确认收货
export function SureOrder(id) {
	var goods = intance({
		url: "/api/orders/" + id + "/confirm" ,
        method: 'PATCH',
	});
	return goods
}

// 物流信息
export function logistict(id) {
	var goods = intance({
		url: "/api/orders/" + id + "/express" ,
        method: 'GET',
	});
	return goods
}




