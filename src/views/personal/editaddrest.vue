<template>
    <div class="box">
        <navheard>
			<template v-slot:center>编辑地址</template>
		</navheard>
        <div class="content">
            <van-address-edit
            :area-list="areaList"
            :address-info="defaultlist"
            show-delete
            show-set-default
            show-search-result
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
import { reactive, ref, onMounted  } from 'vue';
import { Toast } from 'vant';
import {useRoute, useRouter} from 'vue-router'
import {addrestdetail} from '@/network/addrest.js'
import {tdist} from '@/citydate/address.js'
import {updateaddrest} from '@/network/addrest.js'
import {deleteaddrest} from '@/network/addrest.js'

export default {
    name: 'editaddrest',
    components: {
        navheard
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const searchResult = ref([]);
        const areaList = reactive({
            province_list:[],
            city_list:[],
            county_list:[],
        });
        
        const defaultlist = reactive({
            name: '',
            tel: '',
            province: '',
            city: '',
            county: '',
            addressDetail: '',
            isDefault:false,
            areaCode: '',
        });
        // 更新地址
        const onSave = (content) => {
            const finallist = {
                name: content.name,
                address: content.addressDetail,
                phone: content.tel,
                province: content.province,
                city: content.city,
                county: content.county,
                is_default: content.isDefault,
            }
            updateaddrest(route.query.id,finallist).then((res)=>{
                if(res.status==204)
                {
                    Toast.success('保存成功');
                    router.push({path:'/addrest'})
                }
            })
        };
        // 删除地址
        const onDelete = () => {
            deleteaddrest(route.query.id).then((res)=>{
                if(res.status==204)
                {
                    Toast.success('删除成功');
                    router.push({path:'/addrest'})
                }
            })
        };


        const onChangeDetail = (val) => {
        if (val) {
            searchResult.value = [{
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },];
        } else {
            searchResult.value = [];
        }
        };

        let _province_list = {};
        let _city_list = {};
        let _county_list = {};
        onMounted(() => {
            // 获取地区列表areaList
            tdist.getLev1().forEach(n => {
                _province_list[n.id] = n.text;
                tdist.getLev2(n.id).forEach(m => {
                    _city_list[m.id] = m.text;
                    tdist.getLev3(m.id).forEach(p => {
                        _county_list[p.id] = p.text;
                    });

                });
            });
            let _areaCode = '';
            const province = tdist.getLev1();
            areaList.province_list = _province_list;
            areaList.city_list = _city_list;
            areaList.county_list = _county_list;
            addrestdetail(route.query.id).then((res)=>{
                // 以下是地区初始值的设置，根据county编码追溯到city编码和province编码
                Object.entries(areaList.county_list).forEach(([id, text]) => {
                    // 先找出当前对应的区
                    if (text == res.data.county) {
                        // 找到区对应的几个省份
                        const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
                        // 找到区对应的几个市区
                        // eslint-disable-next-line no-unused-vars
                        const cityItem = Object.entries(areaList.city_list).filter(([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
                        // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
                        if (province[provinceIndex].text == res.data.province && cityItem[1] == res.data.city) {
                        _areaCode = id
                        }
                    }
                })
                // 初始值列表defaultlist赋值
                defaultlist.name = res.data.name;
                defaultlist.tel = res.data.phone;
                defaultlist.province = res.data.province;
                defaultlist.city = res.data.city;
                defaultlist.county = res.data.county;
                defaultlist.addressDetail = res.data.address;
                defaultlist.areaCode = _areaCode;
                defaultlist.isDefault = res.data.is_default==1?true:false;
                console.log(res);
                console.log(defaultlist);
            })
        });

        return {
            defaultlist,
            onSave,
            onDelete,
            areaList,
            searchResult,
            onChangeDetail,
        };
    },
}
</script>
<style scoped lang="scss">
    .content {
        margin-top: 35px;
    }
</style>