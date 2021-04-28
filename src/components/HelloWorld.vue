<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div class="a">
			<div class="b">1</div>
			<div class="c">2</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.c {
		height: 60px;
		width: 60px;
		background-color: red;
		float: right;
		
	}
	.b {
		height: 60px;
		width: 60px;
		background-color: red;
	}
	.a {
		height: 300px;
		width: 300px;
		background-color: yellow;
		display: flex;
		justify-content: space-between;
		
	}
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
