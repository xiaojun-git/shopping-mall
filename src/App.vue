<template>
	<div>
		<router-view v-slot="{ Component }">
		  <transition>
		    <keep-alive :include="$store.state.keepLiveRoute">
		      <component :is="Component" />
		    </keep-alive>
		  </transition>
		</router-view>
		
		<div class="a" v-show="!$store.state.detall.buyinflag">
			<div id="nav">
				<router-link class="c" to="/">
					<a href="#">

						<i class="iconfont icon-biaoqiankuozhan_shouye-386"></i>
						<div class="b">首页</div>

					</a>
				</router-link>
				<router-link class="c" to="/category">
					<a href="#">

						<i class="iconfont icon-fenlei"></i>
						<div class="b">分类</div>

					</a>
				</router-link>
				<router-link class="c" to="/shopcar">
				<van-badge :content="$store.state.shopcarnum">
					<a href="#">

						<i class="iconfont icon-huaban5"></i>
						<div class="b">购物车</div>

					</a>
				</van-badge>
				</router-link>
				<router-link class="c" to="/personal">
					<a href="#">

						<i class="iconfont icon-wode"></i>
						<div class="b">我的</div>

					</a>
				</router-link>
			</div>
		</div>
		
	</div>
</template>

<style  lang="scss">
	@import "./assets/css/base.css";
	@import './assets/css/iconfont.css';

	.c {
		flex: 1;
		// background-color: orange;
	}

	.b {
		// flex-grow: 1;
		font-size: 15px;
	}

	.a {
		height: 50px;
		width: 100vw;
		position: fixed;
		bottom: 0;
		text-align: center;
		background-color: white;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}



	#nav {
		padding: 3px;
		display: flex;
		// justify-content: space-around;

		a {

			color: #2c3e50;

			&.router-link-exact-active {
				color: red;
			}
		}


	}
</style>
