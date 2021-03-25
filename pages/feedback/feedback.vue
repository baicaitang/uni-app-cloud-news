<template>
	<view>
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="text-area" v-model="content" placeholder="请输入反馈内容" />
		</view>
		<view class="title">
			反馈图片：
		</view>
		<view class="feedback-photo">
			<!-- 选择的图片 -->
			<view class="photo-item" v-for="(item,index) in imgList" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="close" size="28" color="#fff"></uni-icons>
				</view>
				<view class="photo-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 添加图片 -->
			<view class="photo-item" @click="addPhoto" v-if="imgList.length < 5">
				<view class="photo-box">
					<view class="photo">
						<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<!-- 提交反馈 -->
		<view class="feedback-btn">
			<button type="default" class="btn" @click="submit">提交反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				content: ""
			}
		},
		methods: {
			del(index) {
				this.imgList.splice(index, 1)
			},
			// 添加图片
			addPhoto() {
				let count = 5 - this.imgList.length
				uni.chooseImage({
					count: count, //最多选择数,h5端不生效
					success: (res) => {
						console.log(res)
						const {
							tempFilePaths
						} = res
						tempFilePaths.forEach((item, index) => {
							if (index < count) {
								this.imgList.push({
									url: item
								})
							}
						})

						// console.log(this.imgList)
					}
				})
			},
			// 上传图片
			async submit() {
				uni.showLoading()

				let imagePath = []

				for (let i = 0; i < this.imgList.length; i++) {
					const filePath = this.imgList[i].url
					filePath = await this.uploadFiles(filePath)
					imagePath.push(filePath)
				}

				this.updateFeedback({
					content: this.content,
					feedBackImages: imagePath
				})

				// uni.hideLoading()

			},
			// 上传文件到云端
			async uploadFiles(filePath) {

				const result = await uniCloud.uploadFile({
					cloudPath: filePath
				})
				console.log(result)
				return result
			},
			// 更新反馈
			updateFeedback({
				content,
				feedBackImages
			}) {

				this.$api.update_feedback({
					content,
					feedBackImages
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					setTimeout(()=>{
						// 需要跳转的 tabBar 页面的路径，路径后不能带参数
						uni.switchTab({
							url:"/pages/tabbar/my/my"
						})
					},2000)
					uni.hideLoading()
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: '反馈提交失败!',
						icon: 'none'
					})
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		font-size: 14px;
		margin: 15px;
		margin-bottom: 0;
		color: #666;
	}

	.feedback-content {
		margin: 15px;
		padding: 10px;
		height: 100px;
		box-sizing: border-box;
		border: 1px solid #eee;

		.text-area {
			font-size: 12px;
			width: 100%;
			height: 100%;
		}
	}

	.title {
		font-size: 14px;
		margin: 15px;
		margin-bottom: 0;
		color: #666;
	}

	.feedback-photo {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.photo-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			// border: 1px solid #eee;

			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #F07373;
				z-index: 10;
			}

			.photo-box {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: 5px;
				bottom: 5px;
				left: 5px;
				right: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

			}
		}

	}

	.feedback-btn {
		margin: 15px;

		.btn {
			color: #fff;
			background-color: $mk-base-color;
		}
	}
</style>
