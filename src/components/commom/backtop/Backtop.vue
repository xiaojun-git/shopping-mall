<template>
    <div class="back">
        <img @click="myback"  class="backtop" src="@/assets/images/up.png" alt="">
    </div>
</template>
<script>
export default {
    name: 'Backtop',
    setup(props,{emit}) {
        return {
            myback:()=>{
                emit('gotop')
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .back {
        
    }
    .backtop {
        border-radius: 20px;
        z-index: 30;
        height: 40px;
        width: 40px;
        position: fixed;
        bottom: 80px;
        right: 30px;
        background:#EEE9E9 no-repeat center center;
    }
</style>