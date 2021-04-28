<template>
	<div class="recommend">
		<div v-for="item in recodata.slice(0,4)" :key='item.id' class="recommend-nav">
			<a href="" @click.prevent="godetall(item.id)">
				<img v-lazy="item.cover_url" alt="">
				<div>{{item.title}}</div>
			</a>	
		</div>
		
	</div>
</template>

<script>
	import gethomepage from '@/network/home.js';
	import {useRouter} from 'vue-router'
	export default {
		name: 'recommend',
		props: {
			recodata: {
				type: Array,
				default() {
					return {};
				}
			},
			
		},
		setup(props) {
			const router = useRouter();
			function godetall(detallid) {
				router.push({path:'/detall',query:{id:detallid}});
			}
			return {godetall}
			// console.log(props.recodata)
		}
	}
</script>

<style scoped lang="scss">
	.recommend {
		
		width: 100vw;
		display: flex;
		border-bottom: 6px solid lightgray;
		height: 120px;
		justify-content: space-around;
	}
	.recommend-nav {
		text-align: center;
		flex: 1;
		img {
			width: 70px;
			height: 70px;
			margin-top: 10px;
			margin-bottom: 6px;
		};
		div {
			font-size: 16px;
			text-overflow: ellipsis;
			overflow: hidden;
		};
		a {
		}
	}
</style>
