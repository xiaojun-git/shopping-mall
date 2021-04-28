<template>
	<div class="box">
		<navheard>
			<template v-slot:center>商品详情</template>
		</navheard>
		
		<div class="datallscroll">
			<div class="includescroll">
				<div class="topimg">
					<img :src="goods.good.cover_url" alt="">
				</div>
				<div class="cont">
					<van-card
  						:num="goods.good.stock"
  						:price="goods.good.price"
  						:desc="'已售：'+goods.good.sales"
  						:title="goods.good.title"
  						:origin-price="goods.good.price*1.5"
					>
  						<template #tags>
    						<van-tag plain type="danger">{{goods.good.description}}</van-tag>
    				
  						</template>
					</van-card>
				</div>
				<div class="bottom">
					<van-tabs class="bottomtab" v-model="bottomflag" @click="bottomclick">
  						<van-tab title="概述">
							<div class="detailscs" v-html="goods.good.details"></div>
						</van-tab>
  						<van-tab title="热评">222</van-tab>
  						<van-tab title="相关图书">
							<div class="bottomtabcs" >
								<tabgoodlist v-for="item in goods.likegood" :key='item.id' :listdata='item'></tabgoodlist>
							</div>
						</van-tab>
					</van-tabs>
				</div>
			</div>
		</div>
		<!-- 底部加入购物车和购买按钮 -->
		
		<div class="buyin" v-show="$store.state.detall.buyinflag">
			<van-button @click="addcar" class="mybutton" type="danger">加入购物车</van-button>
			<van-button class="mybutton" type="warning">立即购买</van-button>
		</div>

	</div>
</template>

<script>
	import navheard from './navheard.vue';
	import {useRouter} from 'vue-router';
	import {useRoute} from 'vue-router';
	import { ref, onMounted, onUnmounted, reactive, nextTick, watchEffect } from 'vue'
	import {requstdetall} from '@/network/detall.js'
	import BetterScroll from 'better-scroll'
	import tabgoodlist from '@/components/content/tabgoodlist.vue'
	import Tabgoods from '../content/tabgoods.vue';
	import {useStore} from 'vuex'
	import {addshop} from '@/network/shopcar.js'
	
	export default {
		name: 'Detall',
		components: {
			navheard,Tabgoods,tabgoodlist,
		},
		setup() {
			const store = useStore();
			let bs = reactive({});
			let bottomflag = ref(0);
			const route = useRoute();
			let bookid = ref(0);
			const goods = reactive({
				good:{},
				likegood:[],
			})
			const formdate = reactive({
            	goods_id:'',
            	num:'1',
        	})
			bookid.value = route.query.id;

			const addcar = ()=>{
				formdate.goods_id = goods.good.id;
				addshop(formdate).then((res)=>{
					console.log(res);
					store.dispatch('UpadateShopcar');
				})
			}

			const bottomclick = (name)=>{
				// console.log(store.state.detall.buyinflag);
			}

			watchEffect(()=>{
				nextTick(()=>{
					bs && bs.refresh();
				})
			})

			onMounted(() => {
				store.commit('buyinfuc');
				requstdetall(bookid.value).then((res)=>{
					goods.good = res.data.goods;
					goods.likegood = res.data.like_goods;
					
					
				});
				bs = new BetterScroll(document.querySelector(".datallscroll"), {
					probeType:3,
					click:true,
				});
				bs.on('scroll',(position)=>{
					
				})
				nextTick(()=>{
					setTimeout(() => {
						bs && bs.refresh();
					}, 1000);
					
				})
				console.log(store.state.detall.buyinflag);
			});
			onUnmounted(() => {
				store.commit('buyinfuc');
				console.log(store.state.detall.buyinflag);
			});
			
			return {formdate,addcar,bottomclick,goods,bookid,bottomflag}
		}
	}
</script>


<style scoped lang="scss">
	.mybutton {
		border-radius: 30px;
		margin-right: 6px;
		font-size: 18px;
		height: 100%;
	}
	.buyin {
		width: 100vw;
		height: 50px;
		background-color: white;
		position: fixed;
		bottom: 0px;
		left: 0;
		right: 0;
		
		text-align: right;
	}
	.bottomtabcs {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.bottomtabcs tabgoodlist {
		display: inline-block;
	}
	.datallscroll {
		width: 100vw;
		position: absolute;
		top: 35px;
		bottom: 50px;
	}
	.includescroll {
		width: 100%;
	}
	.box {
		width: 100vw;
		position: relative;
	}
	.topimg {
		width: 100%;
		height: 300px;
		img {
			width: 100%;
			height: 300px;
		}
	}
	.cont {
		text-align: left;
	}
	.bottom {
		width: 100%;
	}
	.detailscs {
		
	}
	
</style>

<style lang="scss">
	
	.detailscs *{
        width: 100%!important;
		font-size: 20px!important;
		background-color: #EEE9E9!important;
		text-align: left!important;
		box-sizing: border-box!important;
		margin: 5px 0 5px 0!important;
		padding: 5px 5px 0 5px!important;
		line-height: 30px!important;
		
	}
</style>