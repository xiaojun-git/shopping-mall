<template>
	<div class="tab">
		<tabgoodlist v-if="tabnum==0" v-for="item in salesdata.sales.list" :key='item.id' :listdata='item'></tabgoodlist>
		<tabgoodlist v-if="tabnum==1" v-for="item in salesdata.new.list" :key='item.id' :listdata='item'></tabgoodlist>
		<tabgoodlist v-if="tabnum==2" v-for="item in salesdata.recommend.list" :key='item.id' :listdata='item'></tabgoodlist>
	</div>
</template>

<script>
	import tabgoodlist from './tabgoodlist.vue'
	import { watch } from 'vue'
	export default {
		name: 'tabgoods',
		props: {
			salesdata: {
				type:Object,
				default() {
					return {}
				}
			},
			tabnum: {
				type:Number,
				default() {
					return 0
				}
			},
		},
		components:{
			tabgoodlist
		},
		setup(props) {
			
		}
	}
</script>

<style scoped>
	.tab {
		position: relative;
		z-index: -1;
		margin-top: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 100vw;
	}
</style>
