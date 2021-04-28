<template>
    <div class="box">
        <navheard>
			<template v-slot:center>添加地址</template>
		</navheard>
        <div class="content">
            <van-address-edit
            :area-list="areaList"
            show-set-default
            show-search-result
            save-button-text='添加'
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
        </div>
    </div>
</template>
<script>
import navheard from '@/components/commom/navheard.vue'
import { ref, onMounted, onUnmounted, reactive, watchEffect } from 'vue';
import { Toast } from 'vant';
import {useStore} from 'vuex'
import {addaddrest} from '@/network/addrest.js'
import {tdist} from '@/citydate/address.js'


export default {
    name: 'newaddrest',
    components: {
        navheard
    },
    setup() {
        const adddate = reactive({
            name:'',
            address:'',
            phone:'',
            province:'',
            city:'',
            county:'',
            is_default:0,
        })
        const areaList = reactive({
            province_list:[],
            city_list:[],
            county_list:[],
        });
        const store = useStore();
        const searchResult = ref([]);
        // 新增地址提交
        const onSave = (res) => {
            adddate.name = res.name;
            adddate.address = res.addressDetail;
            adddate.phone = res.tel;
            adddate.province = res.province;
            adddate.city = res.city;
            adddate.county = res.county;
            adddate.is_default = res.isDefault?1:0;
            addaddrest(adddate).then((res)=>{
                if(res.status==201)
                {
                    Toast.success('已添加')
                }
            })
            console.log(res);
        }
        const onDelete = () => Toast('delete');
        const sss = reactive([{
            id: "450000", 
            text: "广西壮族自治区"
        }])
        const onChangeDetail = (val) => {
        if (val) {
            searchResult.value = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },];
        } 
        else {
            searchResult.value = [];
        }
        };

        // watchEffect(()=>{
        //     console.log(areaList.city_list);
        // })

        let _province_list = {};
        let _city_list = {};
        let _county_list = {};

        onMounted(() => {
            areaList.province_list = tdist.getLev1().map(n=>n.text);
            tdist.getLev1().forEach(n => {
                _province_list[n.id] = n.text;
                tdist.getLev2(n.id).forEach(m => {
                    _city_list[m.id] = m.text;
                    tdist.getLev3(m.id).forEach(p => {
                        _county_list[p.id] = p.text;
                    });

                });
            });
            areaList.province_list = _province_list;
            areaList.city_list = _city_list;
            areaList.county_list = _county_list;
            
            store.commit('buyinfuc');
        });

        onUnmounted(() => {
            store.commit('buyinfuc');
        });

        return {
            adddate,
            onSave,
            onDelete,
            areaList,
            searchResult,
            onChangeDetail,
        };
    }
}
</script>
<style scoped lang="scss">
    .content {
        margin-top: 35px;
    }
</style>