<template>
	<div class="box">
		<navcategory class="catehead"></navcategory>
		<div class="box2">
			<!-- 头部导航 -->
			<div class="topnav">
				<van-tabs class="toptab" v-model:active="topflag" @click="topclick">
  					<van-tab title="销量"></van-tab>
  					<van-tab title="价格"></van-tab>
  					<van-tab title="评价"></van-tab>
				</van-tabs>
			</div>
			<!-- 左部导航 -->
			<div class="leftnav">
				<div class="leftnav2">
					<van-collapse v-model="activeName" accordion>
  						<van-collapse-item v-for="(item,index) in leftdata" :key="item.id" :title="item.name" :name="index">
							<van-sidebar class="sidebar" v-model="leftflag" >
  								<van-sidebar-item @click="leftclick" v-for="item2 in item.children" :key="item2.id" :title="item2.name" />
							</van-sidebar>
						</van-collapse-item>
					</van-collapse>
					
				</div>
			</div>
			<!-- 右部内容排版 -->
			<div class="wrapper2">
				<div class="content">
				<van-card 
					v-for="(item,index) in lastdata"
					:key="index"
  					:price='item.price'
  					:desc="'已售：'+item.sales"
  					:title="item.title"
					:origin-price="item.price*1.5"
  					:thumb="item.cover_url"
					@click="godetall(item.id)"
				>
  					<template #tags>
    					<van-tag plain type="danger">{{$store.state.categorylefttype}}</van-tag>
    					<van-tag plain type="danger">标签</van-tag>
  					</template>
				</van-card>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import navheard from '@/components/commom/navheard.vue'
	import navcategory from '@/components/commom/navcategory.vue'
	import { ref, onMounted, reactive, onUnmounted, nextTick } from 'vue'
	import { Toast } from 'vant';
	import requestcate from '@/network/category.js'
	import {requstgoods} from '@/network/category.js'
	import {useStore} from 'vuex'
	import BetterScroll from 'better-scroll'
	import {useRouter} from 'vue-router'

	export default {
		name: 'category',
		setup() {
			let bs = reactive({});
			let bs2 = reactive({});
			const store = useStore();
			const lastdata = ref({});
			const activeName = ref(0);
			const leftdata = ref([]);
			const leftflag = ref(0);
			const topflag = ref(0);
			const nowtype = ref('');
			const noworder = ref('sales');
			const orderlist = reactive(['sales','price','comments_count']);
			// 商品点击详情跳转
			const router = useRouter();
			function godetall(detallid) {
				router.push({path:'/detall',query:{id:detallid}});
			}

			const catedata = reactive({
				sales:{page:0,list:[]},
				price:{page:0,list:[]},
				comments_count:{page:0,list:[]},
			});
			// 左部导航分类click事件
    		const leftclick = (index) => {
				nowtype.value = leftdata.value[activeName.value].children[index].id;
				noworder.value = orderlist[topflag.value];
				// vuex里存放商品类别，用于商品卡片标签
				store.commit('categoryleft',leftdata.value[activeName.value].children[index].name);
				requstgoods(nowtype.value,noworder.value).then((res)=>{
					catedata[noworder.value].list = res.data.goods.data;
					lastdata.value = catedata[noworder.value].list;
					nextTick(()=>{
						bs.refresh();
						bs2.refresh();
					})
					
				});
				
			};
			// 头部导航分类click事件
			const topclick = (name, title) => {
				noworder.value = orderlist[topflag.value];
				requstgoods(nowtype.value,noworder.value).then((res)=>{
					catedata[noworder.value].list = res.data.goods.data;
					lastdata.value = catedata[noworder.value].list;
					nextTick(()=>{
						bs.refresh();
						bs2.refresh();
					})
				})
			};
			onMounted(() => {
				// 获取左部导航分类数据
				requestcate.then((res)=>{
					leftdata.value = res.data.categories;
				})
				
				bs = new BetterScroll(document.querySelector(".wrapper2"), {
					probeType:3,
					click:true,
					pullUpLoad:true,
				});
				bs2 = new BetterScroll(document.querySelector(".leftnav"), {
					probeType:3,
					click:true,
					pullUpLoad:true,
				});
				bs.on('scroll',(position)=>{
					
				});
				bs2.on('scroll',(position)=>{
					
				})
			});
			onUnmounted(() => {
				console.log('已销毁');
			});


			return {godetall,lastdata,catedata,orderlist,activeName,leftdata,topclick,topflag,leftflag,leftclick}
		},
		components: {
			navheard,navcategory
		}
	}
</script>

<style scoped lang="scss">
	.catehead {
		z-index: 10;
		
	}
	.toptab {
		margin-left: 140px;
		height: 100%;
	}
	.sidebar {
		width: 100%;
	}
	.leftnav2 {
		// width: 100%;
		overflow: hidden;
	}
	.box {
		height: 100vh;
		width: 100vw;
		position: relative;
	}
	.box2 {
		width: 100vw;
		position: absolute;
		top: 50px;
		bottom: 50px;
		
	}
	.topnav {
		position: absolute;
		width: 100%;
		height: 60px;
		z-index: 10;
	}
	.leftnav {
		position: absolute;
		width: 140px;
		bottom: 0px;
		left: 0;
		top: 60px;
		overflow: hidden;
	}
	.wrapper2 {
		text-align: left;
		position: absolute;
		right: 0;
		bottom: 0;
		top: 60px;
		left: 140px;
	}
	.content {
		z-index: -1;
	}
</style>
