<template>
	<div class="box">
		<navheard>
			<template v-slot:center>购物车</template>
		</navheard>
		
		<div v-if="!$store.state.Tokenisok" class="overtimelogin">
			<van-button @click="gologin" class="but" type="danger">登录</van-button>
			
		</div>
		<div v-if="$store.state.Tokenisok" class="shop">
			<div class="shopitem">
				<shoplist></shoplist>
			</div>
		</div>
	</div>
</template>

<script>
	import navheard from '@/components/commom/navheard.vue'
	import { ref, onMounted, onUnmounted } from 'vue'
	import { Button } from 'vant';
	import shoplist from '@/views/shopcar/shoplist.vue'
	import {useRouter} from 'vue-router'

	export default {
		name: 'shopcar',
		components: {
			navheard,shoplist
		},
		setup() {
			const router = useRouter();
			const gologin = ()=>{
				router.push({path:'/login'});
			}
			onUnmounted(() => {
				console.log('已销毁');
			});
			return {gologin}
		}
	}
</script>

<style scoped lang='scss'>
	
	.shop {
		margin-top: 35px;
		width: 100vw;
	}
	.shopitem {
		width: 100%;
	}
	.box {
		width: 100vw;
	}
	.overtimelogin {
		margin-top: 65px;
		height: 50px;
		width: 100%;
		.but {
			font-size: 20px;
			width: 90px;
		}
	}
</style>
