<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-img">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-cont-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header-cont-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-btn" @click="follow(formData.author.id)">
				{{formData.is_author_like?'取消关注':'关注'}}
			</button>
		</view>
		<!-- 内容 -->
		<view class="detail-content">
			<!-- 内容区 -->
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
			<!-- 评论区 -->
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box" @click="openList">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"
						@click="likeTap(formData._id)"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons :type="formData.is_thumbs_up ?'hand-thumbsup-filled':'hand-thumbsup'" size="22"
						color="#F07373" @click="thumbsup(formData._id)"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 发布评论弹框 -->
		<popup ref="popup" @submit="submit"></popup>
	</view>
</template>

<script>
	// 富文本
	import uParse from "@/components/gaoyia-parse/parse.vue"
	export default {
		data() {
			return {
				formData: {}, //预加载数据、请求数据
				noData: '<p style="text-align:center;color:#666;">详情加载中</p>',
				commentsValue: "", //输入评论内容
				commentsList: [], //评论数据
				replyFormData: {}, //回复相关变量
				// showComments: false
			}
		},
		components: {
			uParse
		},
		onLoad(query) {
			// console.log(JSON.parse(query.params))
			// 数据预加载
			this.formData = JSON.parse(query.params)
			// 请求数据
			this.getArticleDetail()
			// 获取评论数据
			this.getComments()
		},
		onReady() {
			// 所有组件渲染完成后
			// popup
			// this.$refs.popup.open()
		},
		methods: {
			follow(author_id) {
				// console.log(author_id)
				this.updateAuthor(author_id)
			},
			likeTap(article_id) {
				this.updateLike(article_id)
			},
			thumbsup(article_id) {
				this.updateThumbsup(article_id)
			},
			// 打开评论列表
			openList() {
				uni.navigateTo({
					url: "/pages/detail-comment/detail-comment?id=" + this.formData._id
				})
			},
			// 获取文章详情信息
			getArticleDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					console.log(res)
					this.formData = res.data
				})
			},
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			// 提交评论
			submit(content) {
				this.updateComment({
					content,
					...this.replyFormData //回复信息
				})

			},
			// 更新评论
			updateComment(data) {
				// console.log(data)
				uni.showLoading()
				const formData = {
					article_id: this.formData._id,
					...data
				}
				this.$api.update_comment(formData).then(res => {
					// console.log(res)
					uni.hideLoading()
					this.close()
					uni.showToast({
						title: "发布成功"
					})
					this.getComments()
					//清空回复数据
					this.replyFormData = {}
					this.commentsValue = ""
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
					this.close()
				})
			},
			// 请求评论数据
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id,
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					this.commentsList = data
				}).catch(err => {
					console.log(err)
				})
			},
			// 评论回复
			reply(e) {
				this.replyFormData = {
					"comment_id": e.comments.comment_id, //回复的评论id
					"is_reply": e.is_reply //是否子回复
				}
				// console.log(e)
				if (e.comments.reply_id) {
					// 子回复时,追加reply_id
					this.replyFormData.reply_id = e.comments.reply_id
				}
				// console.log("评论回复:",this.replyFormData)
				this.openComment()
			},
			// 关注作者
			updateAuthor(author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			// 收藏文章
			updateLike(article_id) {
				uni.showLoading()
				this.$api.update_likes({
					article_id
				}).then(res => {
					// console.log(res)
					// 通知首页更新收藏
					uni.$emit("update_article")
					this.formData.is_like = !this.formData.is_like
					uni.hideLoading()
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			// 点赞文章
			updateThumbsup(article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res => {
					// console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.formData.is_thumbs_up = true
					if (!res.msg === '已经点过赞了') {
						this.formData.thumbs_up_count++
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},

		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header-img {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header-content {
			padding-left: 10px;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header-cont-title {
				margin-bottom: 5px;
				color: #333;
				font-size: 14px;
			}

			.detail-header-cont-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}

		.detail-header-btn {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #fff;
		}

	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		// border: 1px solid red;

		.detail-html {
			padding: 0 15px;
		}

		.detail-comment {
			margin-top: 30px;

			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #F5F5F5;
			}

			.comment-content {
				padding: 0 15px;
				border-top: 1px solid #eee;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 5px;

			text {
				color: #999;
				font-size: 14px;
			}
		}

		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom-icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}

	
</style>
