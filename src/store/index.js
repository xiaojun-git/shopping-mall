import { createStore } from 'vuex'
import {showshop} from '@/network/shopcar.js'

const keepLiveRoute = ['Home','category','personal']

const Detallmodule = {
  state:{
    buyinflag:false
  },
  mutations:{
    buyinfuc(state){
      state.buyinflag = !state.buyinflag
    }
  },
  actions:{},
}

export default createStore({
  state: {
    paylistback:false,
    orderpageBack:false,
    shopcarnum:0,
    userid:window.localStorage.getItem('token')?window.localStorage.getItem('myid'):'',
    Tokenisok:window.localStorage.getItem('token')?true:false,
    TabFlagdate:0,
    categorylefttype:'',
    keepLiveRoute:keepLiveRoute,
  },
  mutations: {
    ChangePayBack(state){
      state.paylistback = !state.paylistback;
    },
    ChangeOrderBack(state){
      state.orderpageBack = !state.orderpageBack;
    },
    ChangeShopNum(state,index) {
      state.shopcarnum = index;
    },
    Userid(state,index) {
      state.userid = index;
    },
    Tokenchange(state,index) {
      state.Tokenisok = index;
    },
    TabFlag (state,index) {
      state.TabFlagdate = index;
    },
    categoryleft(state,index){
      state.categorylefttype = index;
    }
  },
  getter: {

  },
  actions: {
    UpadateShopcar(contex) {
      showshop().then((res)=>{
        // res.data.data
        console.log('我是vuex异步');
        contex.commit('ChangeShopNum',res.data.data.length)
      })
    }
  },
  modules: {
    detall:Detallmodule
  }
})
