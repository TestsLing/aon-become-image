<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<RouterView />
</template>

<style>
.container {
	padding: 0 6.4vw 18.4vw;
	margin: 0;
}

.bottom_btn {
	width: 100%;
	position: fixed;
	bottom: 4.27vw;
	left: 0;
	padding: 0 6.4vw;
	box-sizing: border-box;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.bottom_btn uni-button {
	margin: 0;
}

button {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	border: none;
}

.uni-form-item .van-uploader__wrapper,
.uni-form-item .van-uploader__input-wrapper {
	width: 100%;
}
</style>
