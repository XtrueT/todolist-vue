<template>
	<div id="app">
        <!-- <Todo text="TodoList"/> -->
		<Home/>
	</div>
</template>

<script>
// import Todo from './components/Todo.vue';
import Home from './components/Home';

export default {
	name: 'app',
	components: {
		Home,
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
