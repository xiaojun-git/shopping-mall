<template>
    <div class="box2">
        <navheard>
			<template v-slot:center></template>
		</navheard>
        <div class="goodlist">
        <van-tabs @click="tabchange" class="center-cont" v-model="active">
            <div class="wip">
                <div class="content">
                    <!-- 全部 -->
                    <van-tab class="item1" title="全部">
                        <van-card
                            @click="godetail"
                            v-for="(item,index) in allist"
                            :key="index"
                            class="vancar"
                            centered
                            desc=""
                            title=""
                        >
                            <template #tags>
                                <van-image
                                    v-for="(item2,index2) in item.goods.data"
                                    :key="index2"
                                    width="100"
                                    height="100"
                                    :src="item2.cover_url"
                                />
                            </template>
                            <template class="foot" #footer>
                                <span class="spandtitle" v-if="item.goods.data.length==1">{{item.goods.data[0].title}}</span>
                                <span class="spanprice">￥{{item.amount}}</span>
                                <span class="spannum">共{{item.goods.data.length}}件</span>
                                <van-button @click="cancelpay" plain  round  class="but" type="default">取消订单</van-button>
                                <van-button @click="alterpay" plain  round  class="but" type="default">修改订单</van-button>
                                <van-button @click="gopay" plain  round  class="but" type="danger">去支付</van-button>
                            </template>
                        </van-card>
                    </van-tab>
                    <!-- 支付 -->
                    <van-tab title="支付">
                        <van-card
                            v-for="(item,index) in paylist"
                            :key="index"
                            class="vancar"
                            centered
                            desc=""
                            title=""
                        >
                            <template #tags>
                                <van-image
                                    v-for="(item2,index2) in item.goods.data"
                                    :key="index2"
                                    width="100"
                                    height="100"
                                    :src="item2.cover_url"
                                />
                            </template>
                            <template class="foot" #footer>
                                <span class="spandtitle" v-if="item.goods.data.length==1">{{item.goods.data[0].title}}</span>
                                <span class="spanprice">￥{{item.amount}}</span>
                                <span class="spannum">共{{item.goods.data.length}}件</span>
                                <van-button plain  round  class="but" type="default">取消订单</van-button>
                                <van-button plain  round  class="but" type="default">修改订单</van-button>
                                <van-button plain  round  class="but" type="danger">去支付</van-button>
                            </template>
                        </van-card>
                    </van-tab>
                    <!-- 发货 -->
                    <van-tab title="发货">
                        <van-card
                            v-for="(item,index) in sendlist"
                            :key="index"
                            class="vancar"
                            centered
                            desc=""
                            title=""
                        >
                            <template #tags>
                                <van-image
                                    v-for="(item2,index2) in item.goods.data"
                                    :key="index2"
                                    width="100"
                                    height="100"
                                    :src="item2.cover_url"
                                />
                            </template>
                            <template class="foot" #footer>
                                <span class="spandtitle" v-if="item.goods.data.length==1">{{item.goods.data[0].title}}</span>
                                <span class="spanprice">￥{{item.amount}}</span>
                                <span class="spannum">共{{item.goods.data.length}}件</span>
                                <van-button plain  round  class="but" type="default">取消订单</van-button>
                                <van-button plain  round  class="but" type="default">修改订单</van-button>
                                <van-button plain  round  class="but" type="danger">去支付</van-button>
                            </template>
                        </van-card>
                    </van-tab>
                    <!-- 收货 -->
                    <van-tab title="收货">
                        <van-card
                            v-for="(item,index) in receivelist"
                            :key="index"
                            class="vancar"
                            centered
                            desc=""
                            title=""
                        >
                            <template #tags>
                                <van-image
                                    v-for="(item2,index2) in item.goods.data"
                                    :key="index2"
                                    width="100"
                                    height="100"
                                    :src="item2.cover_url"
                                />
                            </template>
                            <template class="foot" #footer>
                                <span class="spandtitle" v-if="item.goods.data.length==1">{{item.goods.data[0].title}}</span>
                                <span class="spanprice">￥{{item.amount}}</span>
                                <span class="spannum">共{{item.goods.data.length}}件</span>
                                <van-button plain  round  class="but" type="default">取消订单</van-button>
                                <van-button plain  round  class="but" type="default">修改订单</van-button>
                                <van-button plain  round  class="but" type="danger">去支付</van-button>
                            </template>
                        </van-card>
                    </van-tab>
                    <!-- 过期 -->
                    <van-tab title="过期">
                        <van-card
                            v-for="(item,index) in overtimelist"
                            :key="index"
                            class="vancar"
                            centered
                            desc=""
                            title=""
                        >
                            <template #tags>
                                <van-image
                                    v-for="(item2,index2) in item.goods.data"
                                    :key="index2"
                                    width="100"
                                    height="100"
                                    :src="item2.cover_url"
                                />
                            </template>
                            <template class="foot" #footer>
                                <span class="spandtitle" v-if="item.goods.data.length==1">{{item.goods.data[0].title}}</span>
                                <span class="spanprice">￥{{item.amount}}</span>
                                <span class="spannum">共{{item.goods.data.length}}件</span>
                                <van-button plain  round  class="but" type="default">取消订单</van-button>
                                <van-button plain  round  class="but" type="default">修改订单</van-button>
                                <van-button plain  round  class="but" type="danger">去支付</van-button>
                            </template>
                        </van-card>
                    </van-tab>
                </div>
            </div>
        </van-tabs>
        </div>
    </div>
</template>
<script>
import navheard from '@/components/commom/navheard.vue'
import {onUnmounted, ref, onMounted, reactive,toRefs,nextTick,watchEffect } from 'vue';
import {Orderlist} from '@/network/order.js'
import BetterScroll from 'better-scroll'
import { useStore } from 'vuex'
import {useRouter,useRoute} from 'vue-router'
import { Toast } from 'vant'

export default {
    name: 'orderlist',
    components: {
        navheard
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        let bs = reactive({});
        const active = ref(0);
        const alldata = reactive({
            allist:[],
            paylist:[],
            sendlist:[],
            receivelist:[],
            overtimelist:[],
        })

        const tabchange = ()=>{
            nextTick(()=>{
				setTimeout(() => {
                    console.log('点击更新');
					bs && bs.refresh();
				}, 0);
			})
        }

        const godetail = ()=>{
            console.log('1111');
        }

        const gopay = ()=>{
            router.push({path:'/orderpage'})
        }
        const cancelpay = ()=>{
            Toast.success('取消订单')
        }
        const alterpay = ()=>{
            Toast.success('修改订单')
        }

        watchEffect(()=>{
			nextTick(()=>{
				setTimeout(() => {
                    console.log('更新');
					bs && bs.refresh();
				}, 0);
			})
		})

        onMounted(() => {
            store.commit('ChangePayBack');
            store.commit('buyinfuc');
            Orderlist({include:['goods','orderDetails']}).then((res)=>{
                alldata.allist = res.data.data.filter(n=>n.status==1);
                alldata.paylist = res.data.data.filter(n=>n.status==2);
                alldata.sendlist = res.data.data.filter(n=>n.status==3);
                alldata.receivelist = res.data.data.filter(n=>n.status==4);
                alldata.overtimelist = res.data.data.filter(n=>n.status==5);
                console.log(res);
            })

            bs = new BetterScroll(document.querySelector(".wip"), {
					probeType:3,
					click:true,
			});
            bs.on('scroll',(position)=>{
					
			})
            
            
        });

        onUnmounted(() => {
            store.commit('ChangePayBack');
            store.commit('buyinfuc');
        });
        return {tabchange,godetail,alterpay,cancelpay,gopay,...toRefs(alldata), active };
    },
}
</script>
<style scoped lang="scss"> 
    .spandtitle {
        position: absolute;
        left: 130px;
        top: 50px;
        font-size: 16px;
    }
    .spanprice {
        position: absolute;
        right: 10px;
        top: 45px;
        font-size: 16px;
    }
    .spannum {
        position: absolute;
        right: 10px;
        top: 65px;
        font-size: 16px;
    }
    .wip {
        position: absolute;
        // margin-top: 35px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 45px;
        z-index: -1;
    }
    .box2 {
        position: relative;
        height: 100vh;
        width: 100vw;
    }
    .goodlist {
        position: absolute;
        // margin-top: 35px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 35px;
        // z-index: -2;
    }
    .foot {
        
    }
    .but {
        margin-top: 5px;
        font-size: 16px;
        width: 100px;
        height: 35px;
    }
    .vancar {
        height: 160px;
        text-align: left;
    }
    .center-cont {
        position: fixed;
        // margin-top: 35px;
        width: 100%;
        height: 100%;
        z-index: 4;
    }
    .item1 {
        overflow: hidden;
    }
</style>