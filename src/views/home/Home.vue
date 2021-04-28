<template>

	<div class="home">
	
		<!-- 首页头部 -->
		<div><navhome></navhome></div>
		<!-- 选项卡顶部固定的复制品 -->
		<tabcontrol v-show="mytrue" @tabfun='tabcontent' :tabarry='tabarry'></tabcontrol>

		<!-- 回到顶部图标 -->
		<Backtop @gotop='gototop' v-show="toptrue"></Backtop>

		<!-- scrall上拉下拉滑动容器wrapper -->
		<div class="wrapper">
			<div class="content">
					
				<div ref="banhei">
					<!-- 轮播 -->
					<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
  						<van-swipe-item v-for="item in swipedata" :key="item.id"><img v-lazy="item.img_url" /></van-swipe-item>
					</van-swipe>
					<!-- <div class="banners"><img src="@/assets/images/middle.webp" alt=""></div> -->
					<!-- 中部推荐商品 -->
					<div><recommend :recodata='mydata'></recommend></div>
				</div>
				<!-- 选项卡 -->
				<tabcontrol @tabfun='tabcontent' :tabarry='tabarry'></tabcontrol>
				<!-- 选项卡商品内容 -->
				<tabgoods :salesdata='salesdata' :tabnum='tabnum'></tabgoods>
				
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import {onUnmounted,onMounted,reactive,ref,watchEffect,nexTick, nextTick} from 'vue'
	import gethomepage from '@/network/home.js'
	import {requstgoods} from '@/network/home.js'
	import navheard from '@/components/commom/navheard.vue'
	import navhome from '@/components/commom/navhome.vue'
	import recommend from './recommend.vue'
	import tabcontrol from '@/components/content/tabcontrol.vue'
	import tabgoods from '@/components/content/tabgoods.vue'
	import BetterScroll from 'better-scroll'
	import Backtop from '@/components/commom/backtop/Backtop.vue'
	import {useRouter} from 'vue-router'
	import {useStore} from 'vuex'

	export default {
		name: 'Home',
		setup() {
			const store = useStore();
			const swipedata = ref([]);
			let toptrue = ref(false);
			let mytrue = ref(false);
			let banhei = ref(null);
			let bs = reactive({});
			let tabnum = ref(0);
			const mydata = ref([]);
			

			const salesdata = reactive({
				sales:{page:0,list:[]},
				recommend:{page:0,list:[]},
				new:{page:0,list:[]},
			}); 
			const tabarry = ref([
				'畅销',
				'新书',
				'精选',
			]);
			const goodstab = reactive([
				'sales',
				'new',
				'recommend',
			]);
			const tabcontent = (tabindex)=>{
				tabnum.value = tabindex;
				nextTick(()=>{
				setTimeout(() => {
					bs && bs.refresh();
				}, 0);
				})
			};

			const gototop = ()=>{
				bs.scrollTo(0,0,300)
			}

			onUnmounted(() => {
				console.log('已销毁');
			});
					
			onMounted(() => {
				gethomepage.then(res => {
					mydata.value = res.data.goods.data;
					swipedata.value = res.data.slides;
				});
				requstgoods().then(res => {
					salesdata.sales.list = res.data.goods.data;
				});
				requstgoods('recommend',1).then(res => {
					salesdata.recommend.list = res.data.goods.data;
				});
				requstgoods('new',1).then(res => {
					salesdata.new.list = res.data.goods.data;
				});
				if(window.localStorage.getItem('token'))
				{
					store.dispatch('UpadateShopcar');
				}
				bs = new BetterScroll(document.querySelector(".wrapper"), {
					probeType:3,
					click:true,
					pullUpLoad:true,
					pullDownRefresh:true,
				});
				// 触发滚动事件
				bs.on('scroll',(position)=>{
					nextTick(()=>{
						mytrue.value = (-position.y) > banhei.value.offsetHeight
					});
					toptrue.value = -position.y>1400;
				})
				// 上拉加载
				bs.on('pullingUp',()=>{
					bs && bs.refresh();
					let a = salesdata[goodstab[tabnum.value]].page + 1;
					requstgoods(goodstab[tabnum.value],a).then(res => {
						salesdata[goodstab[tabnum.value]].list.push(...res.data.goods.data);
						salesdata[goodstab[tabnum.value]].page += 1;
					});
					bs.finishPullUp();
					bs.refresh();
				});
				bs.on('pullingDown',()=>{
					window.location.reload();
				})
				
			})

			watchEffect(()=>{
				nextTick(()=>{
				setTimeout(() => {
					bs && bs.refresh();
				}, 0);
				})
			})

			// console.log(salesdata.sales.list);
			return {swipedata,gototop,toptrue,mytrue,mydata,tabarry,tabnum,tabcontent,salesdata,goodstab,banhei};
			
		},
		components: {
			navheard,navhome,recommend,tabcontrol,tabgoods,Backtop,
			Backtop,

		}
	}
</script>

<style scoped lang='scss'>
	.my-swipe,van-swipe-item{
		color: #fff;
    	font-size: 20px;
		height: 250px;
		width: 100%;
    	line-height: 250px;
    	text-align: center;
    	background-color: #39a9ed;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.banners{
		height: 200px;
		/* margin-top: 80px; */
	}
	.banners img {
		width: 100%;
		height: 200px;
	}
	.home {
		width: 100vw;
		height: 100vh;
		position: relative;
	}
	.wrapper {
		position: absolute;
		top: 80px;
		bottom: 50px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	
</style>