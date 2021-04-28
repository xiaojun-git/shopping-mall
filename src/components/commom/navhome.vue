<template>
	<div class="box2">
		<div class="firstline">
			<div class="left"><img src="@/assets/images/mall.png" alt=""></div>
			<div class="center"></div>
			<div class="right"><img src="@/assets/images/msg.png" alt=""></div>
		</div>
		<div class="nextline">
			<div class="search">
				<img class="img" src="@/assets/images/search.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'navhome'
	}
</script>

<style scoped>
	.box2 {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		background-color: red;
		z-index: 8;
	}
	.img {
		height: 38px;
		margin-top: 1px;
		margin-left: 4px;
	}
	.search {
		/* border: 1px solid black; */
		text-align: left;
		border-radius: 16px;
		margin: 8px;
		width: 98%;
		height: 80%;
		background-color: white;
	}
	.left,.right {
		padding: 3px;
		width: 30px;
		/* background-color: yellow; */
	}
	.firstline {
		display: flex;
		justify-content: space-between;
		width: 100vw;
		height: 30px;
		/* background-color: #42B983; */
		line-height: 30px;
	}
	.nextline {
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 50px;
		/* background-color: red; */
	}
</style>
