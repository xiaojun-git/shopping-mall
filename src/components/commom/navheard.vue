<template>
	<div class="box">
		<div class="nav-left" @click="goback"><slot name="left"><img src="@/assets/images/leftgo.png" alt=""></slot></div>
		<div class="nav-center"><slot name="center"></slot></div>
		<div class="nav-right"><slot name="right"></slot></div>
	</div>
</template>

<script>
	import {useRouter} from 'vue-router'
	import {useStore} from 'vuex'
	export default {
		name: 'navheard',
		setup() {
			const router = useRouter();
			const store = useStore();
			function goback() {
				if(store.state.orderpageBack)
				{
					router.push({path:'/orderlist'})
				}
				else if(store.state.paylistback)
				{
					router.push({path:'/personal'})
				}
				else 
				{
					router.go(-1);	
				}
				
			}
			return {goback}
		}
	}
</script>

<style scoped>
	.nav-left,.nav-right {
		width: 30px;
	}
	
	.box {
		color: white;
		position: fixed;
		top: 0px;
		display: flex;
		justify-content: space-between;
		width: 100vw;
		height: 35px;
		background-color: #EE0000;
		line-height: 35px;
		z-index: 9;
	}
</style>
