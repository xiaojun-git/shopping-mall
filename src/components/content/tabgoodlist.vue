<template>
	<div class="goods" @click="godetall(listdata.id)">
		<img v-lazy="listdata.cover_url" alt="">
		<div class="good-item">
			<div class="good-item-li">{{listdata.title}}</div>
			<span>￥{{listdata.price}}</span>
			<span class="good-item-sp2">
				<span>{{listdata.collects_count}}</span>
				<img src="@/assets/images/shoucang.png" alt="">
			</span>
		</div>
	</div>
</template>

<script>
	import {useRouter} from 'vue-router'

	export default {
		name: 'tabgoodlist',
		props: {
			listdata: {
				type:Object,
				default() {
					return {}
				}
			}
		},
		setup(props) {
			// 商品点击详情跳转
			const router = useRouter();
			function godetall(detallid) {
				router.push({path:'/detall',query:{id:detallid}});
			}
			return {godetall}
		}
	}
</script>

<style scoped lang="scss">
	.goods {
		position: relative;
		padding-bottom: 45px;
		width: 46%;
		z-index: -1;
		img {
			width: 100%;
			height: 200px;
		}
	}
	.good-item {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 18px;
		text-align: center;
	}
	.good-item-li {
		padding: 3px 0 3px 0;
	}
	.good-item-sp2 {
		position: absolute;
		right: 0;
		img {
			height: 16px;
			width: 25px;
		}
	}
</style>
