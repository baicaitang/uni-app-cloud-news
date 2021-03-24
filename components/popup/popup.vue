<template>
	<view class="popup">
		<!-- 自定义组件可使用ref获取节点 -->
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<!-- 弹出层 -->
			<view class="popup-uwrap">
				<view class="popup-header">
					<text class="popup-header-item" @click="close">取消</text>
					<text class="popup-header-item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<!-- textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 tru -->
					<textarea v-model="commentsValue" placeholder="请输入评论内容" maxlength="200" fixed
						class="popup-textarea" />
					<view class="popup-count">
						{{commentsValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "popup",
		data() {
			return {
				commentsValue: ''
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			open() {
				// 打开窗口之前清空内容 
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			close() {
				// 关闭窗口清空内容 
				this.commentsValue = ''
				this.$refs.popup.close()
			},
			submit() {
				if (!this.commentsValue) {
					uni.showToast({
						title: '请输入评论内容',
						icon: "none"
					})
					return
				}
				this.$emit('submit', this.commentsValue)
			}
		}
	}
</script>

<style lang="scss">
	.popup-uwrap {
		background-color: #fff;
	
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
	
			.popup-header-item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
	
		}
	
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
	
			.popup-textarea {
				width: 100%;
				height: 200px;
			}
	
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	
	}
</style>
