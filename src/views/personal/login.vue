<template>
    <div class="box">
        <navheard>
			<template v-slot:center>用户登录</template>
		</navheard>
        <div class="box2">
        <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
        <van-form @submit="onSubmit">
        <van-cell-group class="center">
            <van-field
                class="www"
                v-model="email"
                
                label="邮箱："
                placeholder="请输入邮箱"
                
            />
            <van-field
                class="www"
                v-model="password"
                type="password"
                label="密码："
                placeholder="请输入密码"
                
            />
            
            
        </van-cell-group>
        
        <van-button class="butt" round type="primary" native-type='submit'>登录</van-button>
        </van-form>
        <div class="register-box" @click="goregister">
        <span class="register">注册账号</span>
        </div>
        </div>
    </div>
</template>
<script>
import { ref,reactive,toRefs } from 'vue';
import navheard from '@/components/commom/navheard.vue';
import {requstuser} from '@/network/register.js'
import { Toast } from 'vant';
import {requstlogin} from '@/network/login.js'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
    name: 'register',
    components: {
        navheard
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        let username = ref('');
        let phone = ref('');
        const formdate = reactive({
            email:'',
            password:'',
        })
        const onSubmit = ()=>{
            requstlogin(formdate).then((res)=>{
                // 将验证得的taken保存在本地用window.localStorage  setItem(key,value)  getTiem(key)
                window.localStorage.setItem('token',res.data.access_token);
                window.localStorage.setItem('myid',formdate.email);
                
                store.commit('Userid',formdate.email);
                store.commit('Tokenchange',true);
                store.dispatch('UpadateShopcar');
                formdate.email = '';
                formdate.password = '';
                Toast.success("登录成功");
                setTimeout(() => {
                    router.go(-1);
                }, 1000);
            })
        }
        const goregister = ()=>{
            router.push({path:'/register'});
        }
        return {goregister,onSubmit,...toRefs(formdate),username,phone}
    }
}
</script>
<style scoped lang="scss">
    .register-box {
        text-align: right;
    }
    .register {
        text-align: center;
        margin-top: 20px;
        margin-right: 20px;
        font-size: 20px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 100px;
        
    }
    .butt {
        font-size: 20px;
        margin-top: 20px;
        width: 90vw;
    }
    .www {
        font-size: 20px;
        padding: 10px 20px 10px 20px;
    }
    .center {
        margin-top: 60px;
    }
    van-field {
        font-size: 20px;
        padding: 10px;
    }
    .box2 {
        position: absolute;
        top: 0px;
        height: 100vh;
        background-color: white;
    }
    .box {
        position: relative;
        width: 100vw;
        
    }
    img {
        width: 100%;
    }
</style>
