<template>
	<div class="box">
		<div class="top">
			<van-image
				class="myimg"
  				round
  				src="https://img01.yzcdn.cn/vant/cat.jpeg"
			/>
			<span v-if="!$store.state.Tokenisok" @click="gologin">登录/注册--></span>
			<span v-if="$store.state.Tokenisok">欢迎：{{$store.state.userid}}</span>

		</div>
		<div class="center">
			<van-cell class="child" center is-link>
  				<template #title>
					<van-icon color="#1989fa" name="shop-o" size="30" />
    				<span class="custom-title">我的收藏</span>
  				</template>
			</van-cell>
			<van-cell @click="$router.push({path:'/orderlist'})" class="child" center is-link>
  				<template #title>
					<van-icon color="#1989fa" name="cart-o" size="30" />
    				<span class="custom-title">我的订单</span>
  				</template>
			</van-cell>
			<van-cell @click="$router.push({path:'/addrest'})" class="child" center is-link>
  				<template #title>
					<van-icon color="#1989fa" name="wap-home-o" size="30" />
    				<span class="custom-title">我的地址</span>
  				</template>
			</van-cell>
			<van-cell class="child" center is-link>
  				<template #title>
					<van-icon color="#1989fa" name="clock-o" size="30" />
    				<span class="custom-title">浏览历史</span>
  				</template>
			</van-cell>
			<van-cell v-if="$store.state.Tokenisok" class="child2" center clickable @click="goout">
  				<template #title>
    				<span class="getout">退出登录</span>
  				</template>
			</van-cell>
		</div>
	</div>
	
</template>

<script>
	import { ref, onMounted, onUnmounted } from 'vue'
	import {Image as VanImage} from 'vant'
	import { Cell, CellGroup } from 'vant';
	import {useRouter} from 'vue-router'
	import {gotoout} from '@/network/login.js'
	import { Toast } from 'vant';
	import {useStore} from 'vuex'

	export default {
		name: 'personal',
		setup() {
			const store = useStore();
			const router = useRouter();
			let activeNames = ref('')
			onUnmounted(() => {
				console.log('已销毁');
			});
			const myclick = ()=>{
				console.log(activeNames);
			}
			const gologin = ()=>{
				router.push({path:'/login'});
			}
			const goout = ()=>{
				gotoout().then((res)=>{
					if(res.status=='204')
					{
						store.commit('ChangeShopNum',0);
						Toast.success("退出成功");
						window.localStorage.setItem('token','')
					}
					store.commit('Tokenchange',false);
				})
			}
			return {goout,gologin,myclick,activeNames}
		}
	}
</script>

<style scoped lang='scss'>
	.getout {
		margin-left: 150px;
	}
	.custom-title {
		position: absolute;
		height: 30px;
		width: 80px;
		left: 52px;
		line-height: 30px;
		top: 15px;
		
  	}
	.center {
		height: 60px;
		text-align: left;
		line-height: 60px;
	}
	.child {
		height: 60px;
		font-size: 20px;
	}
	.child2 {
		
		height: 60px;
		font-size: 20px;
	}
	.box {
		position: relative;
		width: 100vw;
	}
	.top {
		text-align: left;
		width: 100%;
		height: 120px;
		span {
			font-size: 20px;
			text-align: center;
			position: absolute;
			line-height: 40px;
			height: 40px;
			
			display: inline-block;
			top: 10px;
			left: 130px;
		}
	}
	.myimg {
		margin: 10px 0 10px 20px;
		display: inline-block;
		width: 100px;
  		height: 100px;
	}
</style>
