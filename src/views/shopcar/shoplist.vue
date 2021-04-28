<template>
    <div class="box">
        <div class="box2">
            
            <van-checkbox-group class="groupclass" @change="mychoice" v-model="list2" ref="checkboxGroup">
            <van-checkbox label-disabled v-for="(item,index) in shopdata" :key="index" class="checkitem" :name="item.id">
                <van-swipe-cell class="myswipe">
                <van-card
                    class="shopitem"
                    :price="item.goods.price"
                    :desc="item.goods.description"
                    :title="item.goods.title"
                    :thumb="item.goods.cover_url"
                    :origin-price="item.goods.price*1.5"
                >
                    <template #footer>
                        <div class="foot">
                            <div class="num">X{{item.goods.stock}}</div>
                            <van-stepper :min="1" :max='item.goods.stock' v-model="item.num" :name="item.id" @change="onChange"/>
                        </div>
                    </template>
                </van-card>
                <template #right>
                    <van-button @click="deletelist(item.id)" square text="删除" type="danger" class="delete-button" />
                </template>
                </van-swipe-cell>
            </van-checkbox>
            </van-checkbox-group>
            
        </div>
        
        <van-submit-bar class="orderButton" :price="totalprice" button-text="去结算" @submit="onSubmit">
            <van-checkbox v-model="allchoice" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
import {computed, watch, ref, watchEffect, onMounted, reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import {showshop} from '@/network/shopcar.js'
import {changecar} from '@/network/shopcar.js'
import {changechoice} from '@/network/shopcar.js'
import {deletecar} from '@/network/shopcar.js'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
    name:'shoplist',
    setup() {
        const store = useStore();
        const router = useRouter();
        let allchoice = ref(false);
        let choiceflag = ref(0);
        var allprice = ref(0);
        var timeout = reactive({});
        var choicetimeout = reactive({});
        let checkeditem = ref(false);
        let shopdata = ref([]);
        let list2 = ref([]);
        const checkboxGroup = ref(null);

        // 计算总价
        let totalprice = computed(()=>{
            allprice.value = 0;
            shopdata.value.forEach((n)=>{
                list2.value.forEach((m)=>{
                    if(n.id==m)
                    {
                        allprice.value += (n.goods.price*n.num);
                    }
                })
            })
            return allprice.value*100
        })

        // 删除购物车
        const deletelist = (myid)=>{
            deletecar(myid).then((res)=>{
                if(res.status==204)
                {
                    shopdata.value = shopdata.value.filter(n=>n.id!=myid);
                    store.dispatch('UpadateShopcar');
                    Toast.success("删除成功");
                }
            })
        }

        // 购物车选中
        const mychoice = ()=>{
            if(choiceflag.value==1)
            {
                clearTimeout(choicetimeout);
                choicetimeout = setTimeout(() => {
                    changechoice({cart_ids:list2.value}).then((res)=>{
                        
                    })
                }, 1000);
            }
            
        }

        // 全选按钮
        const checkAll = () => {
            if(list2.value.length==shopdata.value.length)
            {
                checkboxGroup.value.toggleAll(false);
            }
            else {
                checkboxGroup.value.toggleAll(true);
            }
        };
        
        // 提交订单代码
        const onSubmit = () => {
            router.push({path:'/writeorder'})
        };

        // 选中数组实时监视
        
        watchEffect(()=>{
            console.log(shopdata.value);
        })

        // 商品数量增加减少
        const onChange = (value,my)=>{
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                changecar(my.name,{num:value}).then((res)=>{

                })
            }, 2000);
        }

        // 组件完成的生命周期后获取购物车全体数据
        onMounted(() => {
            store.dispatch('UpadateShopcar');
            showshop().then((res)=>{
                shopdata.value = res.data.data;
                // checkeditem.value = shopdata.value.is_checked==1?true:false;
                list2.value = res.data.data.filter(n=>n.is_checked==1).map(item=>item.id)
                choiceflag.value = 1;
            })
            
        });

        return {allchoice,totalprice,allprice,deletelist,choiceflag,mychoice,onChange,list2,checkeditem,shopdata,onSubmit,checkAll,checkboxGroup,}
    }
}
</script>
<style scoped lang="scss">
    .orderButton {
        bottom: 52px;
    }
    .myswipe {
        top: 0;
        right: 0px;
        left: 30px;
        position: absolute;
    }
    .groupclass {
        width: 100%;
    }
    .delete-button {
        height: 100%;
    }

    .num {
        position: absolute;
        right: 0;
        top: -60px;
    }
    .foot {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .checkitem {
        position: relative;
        // width: 100%;
        height: 105px;
        text-align: left;
    }
    .shopitem {
        
        padding-left: 0px;
        padding-right: 0px;
    }
    .box {
        width: 100vw;
        position: relative;
    }
    .box2 {
        position: absolute;
        right: 0;
        left: 10px;
    }
</style>