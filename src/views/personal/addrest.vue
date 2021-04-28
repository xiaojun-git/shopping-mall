<template>
    <div class="box">
        <navheard>
			<template v-slot:center>地址</template>
		</navheard>
        <div class="wip">
            <div class="content">
                <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="onEdit"
                    @click-item="onItem"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { Toast } from 'vant';
import navheard from '@/components/commom/navheard.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'
import {getaddrestlist} from '@/network/addrest.js'

export default {
    name: 'addrest',
    components: {
        navheard
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const chosenAddressId = ref('1');
        let list = reactive([]);

        const onAdd = () => {
            router.push({path:'/newaddrest'})
        };
        const onEdit = (item, index) => {
            router.push({path:'/editaddrest',query:{id:list[index].id}})
            console.log(list[index]);
        };
        const onItem = (item) => {
            console.log(item);
            if(route.query.flag==1)
            {
                router.push({path:'/writeorder',query:{id:item.id}})
            }
            
        };
        onMounted(() => {
            getaddrestlist().then((res)=>{
                res.data.data.forEach((n,index )=> {
                    list[index] = {
                        id: n.id,
                        name: n.name,
                        tel: n.phone,
                        address: n.province + ' ' + n.city + ' ' + n.county + ' ' + n.address,
                        isDefault: n.is_default=='1'?true:false,
                    }
                });
                console.log(list);
            })
            store.commit('buyinfuc');
        });

        onUnmounted(() => {
            store.commit('buyinfuc');
        });

        return {
            onItem,
            list,
            onAdd,
            onEdit,
            chosenAddressId,
        };
    }
}
</script>
<style scoped lang="scss">
    .content {
        width: 100%;
        // background-color: red;
    }
    .wip {
        width: 100%;
        position: absolute;
        background: yellow;
        top: 35px;
        bottom: 0;
    }
    .box {
        width: 100vw;
        position: relative;
    }
</style>