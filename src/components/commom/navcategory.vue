<template>
	<div class="cate-box2">
		
			<div class="cate-left"></div>
			<div class="cate-search">
				<img class="img-cate" src="@/assets/images/search.png" alt="">
			</div>
			<div class="cate-right"><img class="img2-cate" src="@/assets/images/msg.png" alt=""></div>
		
	</div>
</template>

<script>
	export default {
		name: 'navcategory'
	}
</script>

<style scoped>
	.img2-cate {
		height: 40px;
		width: 40px;
		margin-top: 5px;
		/* background-color: yellow; */
	}
	.cate-left,.cate-right {
		height: 50px;
		width: 40px;
		line-height: 50px;
		/* background-color: blue; */
	}
	.cate-box2 {
		position: relative;
		display: flex;
		/* justify-content: center; */
		width: 100vw;
		height: 50px;
		line-height: 50px;
		background-color: red;
	}
	
	.cate-search {
		flex: 1;
		text-align: left;
		border-radius: 16px;
		margin: 5px;
		height: 40px;
		background-color: white;
	}
	.img-cate {
		height: 38px;
		margin-top: 1px;
		margin-left: 4px;
	}
</style>
