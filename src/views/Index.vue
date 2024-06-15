<template>
	<Header></Header>
	<Loading :showLoading="showLoading" />
	<div>
		<!-- 页面内容 -->
		<div class="container">
      <div class="banner">
        <img src="../assets/images/banner.png" mode=""></img>
        <p>{{ appData.title }}</p>
				<p>{{ appData.subtitle }}</p>
      </div>
			<div class="uni-form-item uni-column">
				<div class="title">上传图片</div>

				<div class="content">
					<div class="upload upload-done" v-if="imgUrl">
						<img class="upload-res" :src="imgUrl" mode=""></img>
						<img class="deleteIcon" @click="deleteImg" src="../assets/icons/delete.png" mode=""></img>
					</div>
					<van-uploader v-else style="width: 100%" :max-size="maxSize" @oversize="onOversize"
						:after-read="afterRead">

						<div class="upload upload-before">
							<img class="uploadIcon" src="../assets/icons/uploadImg.png" mode=""></img>
							<text>文件大小限制在30MB以内</text>
						</div>
					</van-uploader>

				</div>

			</div>

      <div class="uni-form-item error-text" v-if="showError">
        <div class="content">请上传图片！</div>
      </div>

      <div class="uni-form-item uni-column">
        <div class="title">选择名画模板</div>
        <div class="templateCon" v-if="templateList.length > 0">
          <div v-for="(item, index) in templateList"
               :class="`template_item ${Number(item.id) === templateId ? 'templateActive' : ''}`"
               @click="selectTemplate(Number(item.id), item.image, item.prompt)" :key="index">
            <img :src="item.image" alt="" />
            <div :class="`isActiveIcon ${Number(item.id) === templateId ? 'active' : ''}`">
              <img src="../assets/icons/selectIcon.png" alt="" v-if="Number(item.id) === templateId">
            </div>
          </div>
        </div>
      </div>




			<div class="bottom_btn">
        <div class="spendCount">
          <img class="icon" src="../assets/icons/money.png" mode=""></img>
          <text>-8</text>
        </div>
				<button class="submitBtn" @click="formSubmit">
					<text>生成图片</text>
				</button>
			</div>


		</div>
	</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router'

import { AI } from 'aonweb'

import 'vant/lib/index.css';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';
import { getTemplate } from '../lib/getTemplate'
const router = useRouter()
let checked = ref(true)
const showLoading = ref(false);
const showError = ref(false);
const logoText = ref('Generate images in clay style');
const imgUrl = ref('');
const becomeImgUrl = ref('')
const submitBecomeImgUrl = ref('')
const submitImgUrl = ref('');
const type = ref('princess zelda')
const maxSize = 30 * 1024 * 1024;

const templateList = ref([]);
const templateId = ref(1);
const prompt = ref('');
const appData = process.env?.appData || {}

function goToComplete(url) {
	const query = { url: url }
	router.push({
		path: '/created',
		query
	})
}

const onOversize = (file) => {
	console.log(file);
	showToast('文件大小不能超过 30MB');
};

function afterRead(file) {
	const formData = new FormData();
	formData.append('file', file.file);
	// 调用上传接口
	uploadFile(formData).then(res => {
		console.log(res);
		if (res.code == 200 && res.data && res.data.length) {
			submitImgUrl.value = res.data
		}
	}).catch(err => {
		showToast('图片上传失败');
		console.log(err);
	});
	imgUrl.value = URL.createObjectURL(file.file);
}

function uploadFileByUrl(url){
      return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('file', blob);
        return uploadFile(formData)
      })
}

// 上传接口
const uploadFile = async (formData) => {
	const response = await fetch('https://tmp-file.aigic.ai/api/v1/upload?expires=1800&type=image/png', {
		method: 'POST',
		body: formData
	});

	const data = await response.json();
	console.log(data);
	return data;
};

function deleteImg() {
	if (imgUrl.value) {
		const formData = new FormData();
		formData.append('file', imgUrl.value);
		// 删除文件
		formData.delete('file');
		imgUrl.value = null;
		submitImgUrl.value = null
		console.log('File deleted:', formData.get('file'));
	} else {
		console.log('No file to delete')
	}
}


const formSubmit = async () => {

	if (!templateId.value
      || !imgUrl.value
  ) {
		showError.value = true
		setTimeout(() => {
			showError.value = false
		}, 3000)
		return
	}
	showLoading.value = true
  let res = await uploadFileByUrl(submitImgUrl.value)
  submitBecomeImgUrl.value = res.data
  try {
		// AI 使用方法
		const ai_options = {
			//Please replace with your own API key or jwt token.
			auth: "Rbhpcp0FKNrYNA1nZkrwrIbD0YSSRlVG",
			// host: "http://localhost:8080"
		}
		const aonet = new AI(ai_options)

		const data = {
      input:{
        "image": submitImgUrl.value,
        "prompt": prompt.value,
        "image_to_become": submitBecomeImgUrl.value,
        "negative_prompt": "",
        "prompt_strength": 2,
        "number_of_images": 1,
        "denoising_strength": 1,
        "instant_id_strength": 1,
        "image_to_become_noise": 0.3,
        "control_depth_strength": 0.2,
        "image_to_become_strength": 0.75
      }
		}
		console.log("formSubmit data", data)
		let response = await aonet.prediction("/predictions/ai/become-image", data)
		console.log("test", response)
		if (response.task.exec_code == 200 && response.task.is_success) {
			showLoading.value = false

			let url = response.output
			if (Array.isArray(response.output)) {
				url = response.output && response.output.length && response.output[0]
			}
			if (typeof url == 'object' || typeof url == 'Object') {
				return
			}

			goToComplete(url)
		} else {
			showLoading.value = false
			showToast('AI 处理失败')
		}
	} catch (error) {
		showLoading.value = false
		showToast('AI 处理失败')
	}

}


async function getTemplateList() {
  try {
    const list = await getTemplate()
    templateList.value = list
    prompt.value = list[0].prompt
    becomeImgUrl.value = list[0].image
  } catch (error) {
    console.log(error)
  }
}

function selectTemplate(id, imageUrl, prompt_) {
  templateId.value = id
  prompt.value = prompt_
  becomeImgUrl.value = imageUrl
}

onMounted(() => {
  getTemplateList()
})
</script>

<style scoped>
.banner {
  width: 100%;
  height: 27.73vw;
  margin-top: 8.53vw;
  margin-bottom: 8.53vw;
  position: relative;
  padding: 4.27vw;
}

.banner img {
  width: 340px;
  position: absolute;
  top: 0;
  left: 0;
  /*width: 100%;*/
  height: 100%;
}

.banner p {
  position: relative;
  z-index: 10;
  font-family: Roboto-Black;
  font-weight: 900;
  font-size: 6.4vw;
  color: #FFFFFF;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.banner p:last-child {
  /*width: 49.07vw;*/
  font-family: Roboto-Regular;
  font-weight: 400;
  font-size: 2.4vw;
  color: #FFFFFF;
  line-height: 4.27vw;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.uni-form-item .title {
  font-family: Roboto-Bold;
  font-weight: bold;
  font-size: 3.73vw;
  color: #000000;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-bottom: 2.13vw;
}

.uni-form-item {
  margin-bottom: 8.53vw;
}

.uni-form-item .content {
  width: 100%;
  height: 14.93vw;
  background: #F1F1F1;
  border-radius: 1.07vw;
  display: flex;
  align-items: center;
  padding: 0 3.2vw;
  box-sizing: border-box;

}
.error-text{
  width: 86.67vw;
  position: fixed;
  bottom: 21.6vw;

}
.error-text .content {
  background-color: #F3A32B;
  font-size: 3.2vw;
  color: #fff;
}

.uni-form-item .content input {
  width: 100%;
  font-size: 3.2vw;
  font-family: Roboto-Regular;
  border: none;
  outline: none;
  background-color: #F1F1F1;
}

.upload {
  width: 100%;
  display: flex;
  align-items: center;
}

.upload-before text {
  color: #575757;
  font-size: 3.2vw;
  font-family: Roboto-Regular;
}

.upload-done {
  justify-content: space-between;
}

.uploadIcon {
  width: 6.4vw;
  height: 6.4vw;
  margin-right: 2.13vw;
}

.upload-res {
  width: auto;
  max-height: 8.53vw;
}

.deleteIcon {
  height: 5.07vw;
  width: 5.07vw;
}


.bottom_btn .spendCount {
  width: 19.2vw;
  height: 9.07vw;
  background: #F1F1F1;
  border-radius: 1.07vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom_btn .spendCount .icon {
  height: 6.4vw;
  width: 6.4vw;
  margin-right: 1.07vw;
}

.bottom_btn .submitBtn {
  width: 64.8vw;
  height: 9.07vw;
  background: #000000;
  box-shadow: 1.07vw 1.07vw 2.13vw .13vw rgba(0, 0, 0, 0.32);
  border-radius: 1.07vw;
  display: flex;
  justify-content: center;
  align-items: center;

}

.bottom_btn .submitBtn text {
  font-size: 3.73vw;
  font-weight: bold;
  background: linear-gradient(182deg, #2F54EB 0%, #FF26A8 100%);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
}

.templateCon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: auto;
  background: transparent;
}

.template_item {
  width: 24.8vw;
  height: 44vw;
  background: #F1F1F1;
  border-radius: 1.07vw;
  margin-bottom: 4.53vw;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

}

.template_item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.templateActive {
  border: .27vw solid #000;

}

.isActiveIcon {
  position: absolute;
  bottom: 1.6vw;
  right: 1.6vw;
  width: 3.2vw;
  height: 3.2vw;
  background: #FFFFFF;
  border: .27vw solid #000000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.isActiveIcon img{
  height: 2.13vw;
  width: 2.13vw;
}

.active{
  background: #EBCC2F;
}
</style>
