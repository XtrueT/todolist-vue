<template>
	<div id="app">
		<header>
			<Todo text="TodoList"/>
		</header>
		<section>
			<!-- <Home/>	 -->
		</section>
	</div>
</template>

<script>
import Todo from './components/Todo.vue';
import Home from './components/Home';

export default {
	name: 'app',
	components:{
		Home,
		Todo,
	}
}
</script>

<style>
	html, body {
	margin: 0;
	padding: 0;
	height: 100%;
	}
</style>
