<template>
    <div class="box">
        <navheard>
			<template v-slot:center>账号注册</template>
		</navheard>
        <div class="box2">
        <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt="">
        <van-form @submit="onSubmit">
        <van-cell-group>
            <van-field
                class="www"
                v-model="name"
                required
                label="用户名"
                placeholder="请输入用户名"
                error-message=""
            />
            <van-field
                class="www"
                v-model="password"
                required
                label="密码"
                placeholder="请输入密码"
                error-message=""
            />
            <van-field
                class="www"
                v-model="password_confirmation"
                required
                label="确认密码"
                placeholder="确认密码"
                error-message=""
            />
            <van-field
                class="www"
                v-model="email"
                required
                label="邮箱"
                placeholder="请输入邮箱"
                error-message=""
            />
        </van-cell-group>
        
        <van-button class="butt" round type="primary" native-type='submit'>提交注册</van-button>
        </van-form>
        </div>
    </div>
</template>
<script>
import { ref,reactive,toRefs } from 'vue';
import navheard from '@/components/commom/navheard.vue';
import {requstuser} from '@/network/register.js'
import { Toast } from 'vant';
import {useRouter} from 'vue-router';

export default {
    name: 'register',
    components: {
        navheard
    },
    setup() {
        const router = useRouter();
        let username = ref('');
        let phone = ref('');
        const formdate = reactive({
            name: '',
            password:'',
            password_confirmation:'',
            email:'',
        })
        const onSubmit = ()=>{
            if(formdate.password!=formdate.password_confirmation)
            {
                Toast('两次密码不一致');
            }
            else {
                requstuser(formdate).then((res)=>{
                    if(res.status==201)
                    {
                        Toast.success("注册成功");
                        setTimeout(() => {
                            router.push({path:'/login'});
                        }, 2000);
                        
                    }
    
                })
            }
            
        }
        return {onSubmit,...toRefs(formdate),username,phone}
    }
}
</script>
<style scoped lang="scss">
    .butt {
        font-size: 20px;
        margin-top: 20px;
        width: 90vw;
    }
    .www {
        font-size: 20px;
        padding: 10px 20px 10px 20px;
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
