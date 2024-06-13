<template>
	<Header></Header>
	<Loading :showLoading="showLoading" />
	<div>
		<!-- 页面内容 -->
		<div class="container">
			<img class="banner" src="../assets/images/banner.png" mode=""></img>
			<div class="uni-form-item uni-column">
				<div class="title">目标图片</div>

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

      <div class="uni-form-item uni-column">
        <div class="title">变成图片</div>
        <div class="content">
          <div class="upload upload-done" v-if="becomeImgUrl">
            <img class="upload-res" :src="becomeImgUrl" mode=""></img>
            <img class="deleteIcon" @click="deleteImgByBecome" src="../assets/icons/delete.png" mode=""></img>
          </div>

          <van-uploader v-else style="width: 100%" :max-size="maxSize" @oversize="onOversize"
                        :after-read="afterReadByBecome">
            <div class="upload upload-before">
              <img class="uploadIcon" src="../assets/icons/uploadImg.png" mode=""></img>
              <text>文件大小限制在30MB以内</text>
            </div>
          </van-uploader>

        </div>
      </div>

      <div class="uni-form-item uni-column">
        <div class="title">选择名画风格</div>
        <div class="type-wrap">

          <div>
            <input type="radio" id="princess"  v-model="type" name="type" value="princess zelda" />
            <label class="margin-left-5" for="princess">萨尔达公主</label>
          </div>

          <div>
            <input type="radio" id="Mona"   v-model="type" name="type" value="Mona Lisa" />
            <label class="margin-left-5" for="Mona">蒙娜丽莎</label>
          </div>

          <div>
            <input type="radio" id="Girl"   v-model="type" name="type" value="
Girl with a Pearl Earring" />
            <label class="margin-left-5" for="Girl">戴珍珠耳环的少女</label>
          </div>

          <div>
            <input type="radio" id="Pearl"   v-model="type" name="type" value="Pearl Girl" />
            <label class="margin-left-5" for="Pearl">珍珠女郎</label>
          </div>




        </div>

      </div>


			<div class="uni-form-item error-text" v-if="showError">
				<div class="content">请上传图片！</div>
			</div>
			<div class="bottom_btn">

				<button class="submitBtn" @click="formSubmit">
					<text>生成图片</text>
				</button>
			</div>


		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router'

import { AI } from 'aonweb'

import 'vant/lib/index.css';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';

const router = useRouter()

const showLoading = ref(false);
const showError = ref(false);
const logoText = ref('Generate images in clay style');
const imgUrl = ref('');
const becomeImgUrl = ref('')
const submitBecomeImgUrl = ref('')
const submitImgUrl = ref('');
const type = ref('princess zelda')
const maxSize = 30 * 1024 * 1024;
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
	console.log(formData, file.file)
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
function afterReadByBecome(file) {
  const formData = new FormData();
  formData.append('file', file.file);
  console.log(formData, file.file)
  // 调用上传接口
  uploadFile(formData).then(res => {
    console.log(res);
    if (res.code == 200 && res.data && res.data.length) {
      submitBecomeImgUrl.value = res.data
    }
  }).catch(err => {
    showToast('图片上传失败');
    console.log(err);
  });
  becomeImgUrl.value = URL.createObjectURL(file.file);
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
function deleteImgByBecome() {
	if (becomeImgUrl.value) {
		const formData = new FormData();
		formData.append('file', becomeImgUrl.value);
		// 删除文件
		formData.delete('file');
    becomeImgUrl.value = null;
		submitBecomeImgUrl.value = null
		console.log('File deleted:', formData.get('file'));
	} else {
		console.log('No file to delete')
	}
}


const formSubmit = async () => {
	if (!logoText.value
      || !imgUrl.value
      || !submitImgUrl.value
      || !becomeImgUrl
      || !submitBecomeImgUrl
  ) {
		showError.value = true
		setTimeout(() => {
			showError.value = false
		}, 3000)
		return
	}
	showLoading.value = true
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
        "prompt": type.value,
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

</script>

<style scoped>
.banner {
	width: 100%;
	height: 27.73vw;
	margin-top: 8.53vw;

	margin-bottom: 8.53vw;
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

.type-wrap{
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
}

.margin-left-5{
  margin-left: 5px;
}
</style>
