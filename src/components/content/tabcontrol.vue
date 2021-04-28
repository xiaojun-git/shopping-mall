<template>
	<div class="tab">
		<a 
		@click.prevent="goTab(index)" 
		class="tab-item" href="#" 
		v-for="(item,index) in itemarray" 
		:key='index'>
		<div :class="{active:$store.state.TabFlagdate==index}">{{item}}</div>
		</a>
		
	</div>
</template>

<script>
	import { ref } from 'vue'
	import {useStore} from 'vuex'
	export default {
		name: 'tabcontrol',
		props: {
			tabarry: {
				type: Array,
				default() {
					return {}
				}
			}
		},
		setup(props,contex) {
			const store = useStore();
			let itemarray = ref(props.tabarry);
			let tabnum = ref(0);
			const goTab = (index)=> {
				store.commit('TabFlag',index);
				tabnum.value = index;
				contex.emit('tabfun',index)
			}
			return {itemarray,goTab,tabnum}
		}
	}
</script>

<style scoped lang="scss">
	.tab {
		line-height: 30px;
		width: 100vw;
		height: 30px;
		display: flex;
		font-size: 15px;
		position: sticky;
		top: 80px;
		z-index: 7;
		background-color: white;
	}
	.tab-item {
		text-align: center;
		flex: 1;
	}
	.active {
		color: var(--color-tint);
		border-bottom: 2px solid var(--color-tint);
	}
</style>
