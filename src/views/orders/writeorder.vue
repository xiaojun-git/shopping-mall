<template>
    <div class="boxw">
        <navheard>
			<template v-slot:center>填写订单</template>
		</navheard>
        <div class="wip2">
            <div class="content">
                <div class="topadd">
                    <van-cell @click="goto" center class="addrestlistitem" value="" is-link>
                        <template #title>
                            <div>{{addrestlist.province}}{{addrestlist.city}}{{addrestlist.county}}</div>
                            <div class="centerdiv">{{addrestlist.address}}</div>
                            <span>{{addrestlist.name}}</span>
                            <span class="rightspan">{{addrestlist.phone}}</span>
                        </template>
                    </van-cell>
                </div>
                
                    <van-card
                        class="goods"
                        centered
                        v-for="(item,index) in carlist"
                        :key="index"
                        :num="item.num"
                        :price="item.goods.price"
                        :title="item.goods.title"
                        :thumb="item.goods.cover_url"
                    >
                    </van-card>
                
            </div>
        </div>
        <van-submit-bar class="orderButton" :price="allprice" button-text="提交订单" @submit="onSubmit" />
    </div>
</template>
<script>
import { ref, onMounted,reactive,computed,watchEffect,nextTick} from 'vue'
import {lookOrder} from '@/network/order.js'
import navheard from '@/components/commom/navheard.vue'
import {useRouter,useRoute} from 'vue-router'
import {addrestdetail} from '@/network/addrest.js'
import {CreateOrder} from '@/network/order.js'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import BetterScroll from 'better-scroll'

export default {
    name: 'writeorder',
    components: {
        navheard
    },
    setup() {
        const store = useStore()
        const router = useRouter();
        const route = useRoute();
        let carlist = ref([]);
        let addrestlist = ref({});
        let bs = reactive({});

        // 地址栏点击切换编辑地址
        const goto = ()=>{
            router.push({path:'/addrest',query:{flag:1}})
        }

        const onSubmit = ()=>{
            store.dispatch('UpadateShopcar');
            CreateOrder({address_id:addrestlist.value.id}).then(()=>{
                router.push({path:'/orderpage'})
                Toast.success('订单已提交!')
            })
        }

        let allprice = computed(()=>{
            return carlist.value.reduce((total,now)=>{
                return total + now.num*now.goods.price;
            },0)*100
        });

        watchEffect(()=>{
				nextTick(()=>{
					setTimeout(() => {
					    bs && bs.refresh();
				    }, 1000);
				})
		})

        onMounted(() => {
            lookOrder().then((res)=>{
                carlist.value = res.data.carts;
                
                console.log(allprice.value);
                if(!route.query.id){
                    addrestlist.value  = res.data.address.filter(n=>n.is_default==1)[0];
                    console.log(addrestlist.value);
                }
                else {
                    addrestdetail(route.query.id).then((res)=>{
                        addrestlist.value  = res.data;
                    })
                }
                
                console.log(carlist.value);
            })
            nextTick(()=>{
				bs && bs.refresh();
			})
            bs = new BetterScroll(document.querySelector(".wip2"), {
					probeType:3,
					click:true,
			});
            bs.on('scroll',(position)=>{
					
			})
        });
        return {
            allprice,
            onSubmit,
            goto,
            carlist,
            addrestlist,
        }
    }
}
</script>
<style scoped lang="scss">
    .content {
       
    }
    .goods {
        text-align: left;
    }
    
    .num {
        position: absolute;
        right: 0;
        top: -60px;
    }
    .rightspan {
        margin-left: 15px;
    }
    .centerdiv {
        font-size: 20px;
        font-weight: 700;
    }
    .addrestlistitem {
        text-align: left;
        width: 100%;
    }
    .boxw {
        background-color: violet;
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .wip2 {
        background-color: yellow;
        position: absolute;
        // margin-top: 35px;
        top: 35px;
        right: 0;
        left: 0;
        bottom: 50px;
    }
</style>