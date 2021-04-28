<template>
    <div class="box">
        <navheard>
			<template v-slot:center></template>
		</navheard>
        <div class="bao">支付宝</div>
        <div class="wechat">微信</div>
    </div>
</template>
<script>
import navheard from '@/components/commom/navheard.vue'
import { onMounted, onUnmounted } from 'vue'
import {useStore} from 'vuex'
export default {
    name: 'orderpage',
    components: {
        navheard
    },
    setup() {
        const store = useStore()
        onMounted(() => {
            store.commit('ChangeOrderBack');
            store.commit('buyinfuc');
        });
        onUnmounted(() => {
            store.commit('ChangeOrderBack');
            store.commit('buyinfuc');
        });
    }
}
</script>
<style scoped lang="scss">
    .box {
        width: 100vw;
    }
    .bao {
        margin-top: 35px;
        background-color: cornflowerblue;
        width: 100%;
        height: 70px;
        line-height: 70px;
    }
    .wechat {
        background-color: limegreen;
        width: 100%;
        height: 70px;
        line-height: 70px;
    }
</style>