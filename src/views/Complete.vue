<template>
	<Header></Header>


	<div class="user">

		<div class="container complete">
			<div>
				<text class="back" @click="goBack">{{ '<' }}BACK</text>
			</div>
			<img class="completeIcon" src="../assets/images/complete.png" mode=""></img>

			<text class="p1">
				Complete the task to obtain AON Points
			</text>

			<text class="p2">
				Your current points are insufficient. Please complete the task to obtain more AON Points.
			</text>

			<button>Share</button>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
} from 'vue';
import { useRoute,useRouter } from 'vue-router'

import Header from '../components/Header.vue';
const router = useRouter()


const goBack = () => {
	router.back();
}


</script>

<style scoped>
.complete {
	padding-top: 4.27vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.back {
	font-family: Roboto-Bold;
	font-weight: bold;
	font-size: 3.2vw;
	color: #000000;
	text-align: left;
	font-style: normal;
	text-decoration-line: underline;
	text-transform: none;
}

.completeIcon {
	width: 67.2vw;
	height: 49.6vw;
	margin: 0 auto;
	margin-top: 16.53vw;
	margin-bottom: 18.13vw;
}

.p1 {
	font-family: Roboto-Black;
	font-weight: 900;
	font-size: 6.4vw;
	color: #000000;
	line-height: 9.07vw;
	text-align: left;
	font-style: normal;
	text-transform: none;
	margin-bottom: 4.27vw;
}

.p2 {

	font-family: Roboto-Regular;
	font-weight: 400;
	font-size: 3.2vw;
	color: #000000;
	line-height: 4.8vw;
	text-align: left;
	font-style: normal;
	text-transform: none;
}

button {
	width: 65.07vw;
	height: 9.07vw;
	line-height: 9.07vw;
	background: #2F54EB;
	box-shadow: 1.07vw 1.07vw 2.13vw .13vw rgba(47, 84, 235, 0.32);
	border-radius: 1.07vw;

	font-family: Roboto-Black;
	font-weight: 900;
	font-size: 3.73vw;
	color: #FFFFFF;
	text-align: center;
	font-style: normal;
	text-transform: none;
	margin: 0 auto;
	margin-top: 14.4vw;
	border: none;
}
</style>
