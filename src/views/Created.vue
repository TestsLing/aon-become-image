<template>
	<div class="">
		<Header></Header>


		<div class="container created">
			<div class="resCon">
				<img class="res_img" :src="imageUrl" mode=""></img>
			</div>

			<div class="download">
				<img src="../assets/icons/download.png" @click="downloadImage" mode=""></img>
			</div>
			<div class="bottom_btn">
				<button class="createMore" @click="goToCreate">返 回</button>
<!--				<button class="shareBtn">Share</button>-->
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	onMounted
} from 'vue';
import { useRoute, useRouter } from 'vue-router'

import Header from '../components/Header.vue';
const router = useRouter()
const route = useRoute()

const imageUrl = ref('')

function goToCreate() {
	router.push({
		path: '/'
	})
}

async function downloadImage() {
	if (!imageUrl.value) return;
	try {
		// Fetch the image as a blob
		const response = await fetch(imageUrl.value);
		const blob = await response.blob();

		// Create a link element and set the URL using the blob
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'downloaded-image.jpg'; // 设置下载的文件名

		// Append the link to the body and click it to trigger the download
		document.body.appendChild(link);
		link.click();

		// Clean up by removing the link element
		document.body.removeChild(link);
	} catch (error) {
		console.error('Error downloading the image:', error);
	}
}

onMounted(() => {
	imageUrl.value = route.query.url;
})
</script>

<style scoped>
.created {
	padding-top: 8.53vw;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.resCon{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 116.27vw;
	width: 100%;
}
.res_img {
	width: 100%;
	height: auto;
	max-height: 116.27vw;
}

.download {
	position: fixed;
	bottom: 23.73vw;
	left: 50%;
	transform: translateX(-50%);
	width: 10.67vw;
	height: 10.67vw;
	border-radius: 100%;
	background: #F1F1F1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.download img {
	height: 4.27vw;
	width: 4.27vw;
}

button {
	font-family: Roboto-Black;
	font-weight: 900;
	font-size: 3.73vw;
	color: #FFFFFF;
	text-align: center;
	font-style: normal;
	text-transform: none;
}

.createMore {
	width: 50.67vw;
	height: 9.07vw;
	background: #000000;
	box-shadow: 1.07vw 1.07vw 2.13vw .13vw rgba(0, 0, 0, 0.32);
	border-radius: 1.07vw;
}

.shareBtn {
	width: 32.27vw;
	height: 9.07vw;
	background: #2F54EB;
	box-shadow: 1.07vw 1.07vw 2.13vw .13vw rgba(47, 84, 235, 0.32);
	border-radius: 1.07vw;
}
</style>
