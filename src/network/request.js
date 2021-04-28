import axios from 'axios';
import { Toast } from 'vant';
import router from '@/router/index.js'

const intance = axios.create({
	baseURL: 'https://api.shop.eduwork.cn',
	timeout:5000
});

// 请求拦截
intance.interceptors.request.use(config=>{
	// 此处可能需要认证
	const token = window.localStorage.getItem('token');
	if(token)
	{
		config.headers.Authorization = 'Bearer' + token
	}
	return config;
},err=>{});

// 响应拦截
intance.interceptors.response.use(config=>{
	return config;
},err=>{
	console.log(err);
	if(err.response.status=='401'&&window.localStorage.getItem('token'))
	{
		Toast.fail('登录已过时，请重新登录');
		router.push({path:'/login'});;
	}
	else if(err.response.status=='401'&&!window.localStorage.getItem('token'))
	{
		Toast.fail('请先登录');
		router.push({path:'/login'});;
	}
	else if(err.response.status=='422')
	{
		Toast.fail('不能为空!');
	}
	else{
	// 根据响应错误号码做不同操作
	Toast(err.response.data.errors[Object.keys(err.response.data.errors)][0]);
	}
})

export default intance;