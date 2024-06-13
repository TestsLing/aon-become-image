<template>
	<Header></Header>

	<div class="user">
		<div class="container">
			<div class="ava-con">
				<img class="ava" src="../assets/icons/user.png" mode=""></img>
				<div class="ava-con-r">
					<text class="userId">user-125482</text>
					<text class="address">
						{{ account }}
						<img class="copy" src="../assets/icons/copy.png" @click="handleCopy" mode="" />
					</text>
				</div>
			</div>
			<img @click="goToComplete" class="person-banner" src="../assets/images/personBanner.png" mode=""></img>

			<!-- <div class="myWork">
				<text>My work</text>
				<div class="waterfall">
					<div class="waterfall-column" v-for="(column, index) in columns" :key="index">
						<img v-for="item in column" :key="item.id" :src="item.src" class="waterfall-item" />
					</div>
				</div>
			</div> -->

			<div class="bottom_btn">
				<button @click="goToCreate">
					Go To Create
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	onMounted
} from 'vue';
import { useRouter } from 'vue-router'
import { Options, User } from 'aonweb'
import { showToast } from 'vant';

import Header from '../components/Header.vue';



const router = useRouter()

const account = ref('')

const handleCopy = async () => {
	try {
		await navigator.clipboard.writeText(account.value);
		showToast('复制成功');
	} catch (err) {
		showToast('复制失败');
	}
};

function goToCreate() {
	router.push({
		path: '/'
	})
}

function goToComplete() {
	router.push({
		path: '/complete'
	})
}
// https://app.aonet.ai/api
// https://app.aonet.ai/kvapi
async function getAccount() {
	const options = new Options({
		type: Options.LoginTypes.TYPE_FP,
		server: 'https://app.aonet.ai',
		storeage_url: 'https://app.aonet.ai'
	});

	console.log(options)

	//User 的使用方法
	let user = new User(options)
	let addr = await user.login()
	console.log("getWeb3 account", addr)
	account.value = addr[0]


	// //detectEthereumProvider 的使用方法
	// let ethereum = await detectEthereumProvider(options)
	// if (ethereum) {
	// 	// console.log(ethereum)
	// 	const web3 = new Web3(ethereum);
	// 	try {
	// 		let account = await ethereum.request({ method: 'eth_requestAccounts' })
	// 		console.log('getWeb3 account', account)
	// 		account = account[0]
	// 		return web3;
	// 	} catch (error) {
	// 		// User denied account access...
	// 		return null;
	// 	}
	// }

	// // AI 使用方法
	// const ai_options = {
	// 	//Please replace with your own API key or jwt token.
	// 	auth: "$API_KEY"
	// }

	// const aonet = new AI(ai_options)

	// let response = await aonet.prediction("/predictions/ai/face-to-many",
	// 	{
	// 		input: {
	// 			"image": "https://aonet.ai/pbxt/KW7CdCusXMkkOs9bbCGYsInC8EUxlj3yBLxvfW9Fs9FFMZUL/MTk4MTczMTkzNzI1Mjg5NjYy.webp",
	// 			"style": "3D",
	// 			"prompt": "a zombie in a fire, burning flames behind him",
	// 			"negative_prompt": "boring",
	// 			"prompt_strength": 4.5,
	// 			"denoising_strength": 1,
	// 			"instant_id_strength": 0.8
	// 		}
	// 	})
	// console.log("test", response)
}

onMounted(() => {
	getAccount()
})

</script>

<style scoped>
.ava-con {
	width: 100%;
	margin-top: 8.53vw;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
}

.ava-con .ava {
	height: 22.93vw;
	width: 22.93vw;
	margin-right: 4.27vw;
}

.ava-con-r {
	width: 60vw;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}

.ava-con-r text {
	word-wrap: break-word;
	font-family: Roboto-Regular;
	font-weight: 400;
	font-size: 3.73vw;
	color: #000000;
	line-height: 5.6vw;
	text-align: left;
	font-style: normal;
	text-transform: none;
}

.ava-con-r .userId {
	font-weight: bold;
	font-size: 4.27vw;
	line-height: 4.27vw;
	margin-bottom: 3.2vw;
	margin-top: 3.73vw;
	text-transform: uppercase;
}

.copy {
	height: 3.2vw;
	width: 3.2vw;
}

.ava-con-r text {
	width: 100%;
}

.person-banner {
	width: 100%;
	height: 36.27vw;
	margin: 6.4vw 0;
}

.myWork text {
	font-family: Roboto-Bold;
	font-weight: bold;
	font-size: 3.73vw;
	color: #000000;
	text-align: left;
	font-style: normal;
	text-transform: none;
	margin-bottom: 4.27vw;
}

button {
	width: 100%;
	height: 9.07vw;
	background: #000000;
	box-shadow: 1.07vw 1.07vw 2.13vw .13vw rgba(0, 0, 0, 0.32);
	border-radius: 1.07vw;

	font-family: Roboto-Black;
	font-weight: 900;
	font-size: 3.73vw;
	color: #FFFFFF;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
