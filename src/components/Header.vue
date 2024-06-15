<template>
	<div class="custom-navbar">
		<img src="../assets/logo_.png" class="logo" @click="goIndex"></img>

		<div class="title">5分钟构建世界名画</div>
    <div class="right">
      <div class="right_count">
        <img src="../assets/icons/money.png" class="moneyIcon"></img>
        <span class="count">120</span>
      </div>
      <img src="../assets/icons/user.png" v-if="!isUserPage" class="userIcon" @click="goUser"></img>
    </div>
	</div>
</template>

<script setup>
import {
	defineProps,
	ref,
	onMounted,
	computed
} from 'vue';
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isUserPage = ref(false);


const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	showBackIcon: {
		type: Boolean,
		default: true
	}
});

const goIndex = () => {
	router.push('/')

};

const goUser = () => {
	router.push('/user')
};
const checkIfUserPage = () => {
	isUserPage.value = route.path === '/user'
};

onMounted(() => {
	checkIfUserPage();
});
</script>

<style scoped>
.custom-navbar {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 13.33vw;
	padding: 0 6.4vw;
	background-color: #fff;
}

.logo {
	width: 10.67vw;
	height: 4.8vw;
}


.title {
	flex: 1;
	font-family: Roboto-Black;
	font-weight: 900;
	font-size: 4.8vw;
	color: #000000;
	text-align: left;
	font-style: normal;
	text-transform: none;
	margin-left: 2.13vw;
}

.right {
	min-width: 16.8vw;
	height: 6.4vw;
	padding: 0 1.07vw;
	background: #000000;
	border-radius: 10.67vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.right_count {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.right .right_count .moneyIcon,
.right .userIcon {
	height: 4.27vw;
	width: 4.27vw;
	margin-right: 1.07vw;
}

.right .userIcon {
	border-radius: 100%;
	margin-right: 0;
	margin-left: 1.07vw;
}

.right .count {
	font-family: Roboto, Roboto;
	font-weight: bold;
	font-size: 2.67vw;
	color: #FFFFFF;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
</style>
