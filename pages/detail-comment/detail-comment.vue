<template>
	<view class="wrap">
		<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"  @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading">
		</uni-load-more>
		<!-- 发布评论弹框 -->
		<popup ref="popup" @submit="submit"></popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: "",
				page: 1,
				pageSize: 5, //主评论数，不含子回复
				loading: "loading",
				replyFormData:{},
			}
		},
		onLoad(query) {
			console.log(query)
			this.article_id = query.id
			this.getComments()
		},
		onReachBottom() {
			// 上拉触底
			console.log('上拉触底')
			if (this.loading === "noMore") return
			this.page++
			this.getComments()
		},
		methods: {
			// 发布评论
			submit(content) {
				this.setUpdateComment({
					content,
					...this.replyFormData
				})
			},
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			// 请求评论数据
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					if (data.length === 0) {
						this.loading = "noMore"
						return
					}

					// 复制对象
					let oldList = JSON.parse(JSON.stringify(this.commentsList))
					oldList.push(...data)
					this.commentsList = oldList

				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 监听回复 
			 * @param {Object} e
			 */
			reply(e) {
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if (e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
				this.openComment()
			},
			/**
			 * 更新评论
			 * @param {Object} content
			 */
			setUpdateComment(content) {
				const formdata = {
					article_id: this.article_id,
					...content
				}
				// 数据重置，避免key重复，添加重复数据
				this.commentsList = []
				this.page = 1
				this.loading = 'loading'
				// console.log(formdata);
				uni.showLoading()
				this.$api.update_comment(formdata).then((res) => {
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title: '评论发布成功'
					})
					this.getComments()
					this.close()
					//清空回复数据
					this.replyFormData = {}
					this.commentsValue = ""
				})
			},
		}
	}
</script>

<style lang="scss">
	.wrap{
		padding-bottom: 15px;
	}
	.comment-content {
		padding: 10px 15px;
		border-top: 1px solid #eee;
	}
</style>
