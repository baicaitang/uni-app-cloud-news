<template>
	<view>
		<view class="my-header">
			<view class="my-header-bg">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>

			<view class="my-header-img">
				<view class="my-header-img-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-header-name">{{userinfo.author_name}}</text>
			</view>

			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-title">被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-title">粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-title">积分</text>
					<text>{{userinfo.integral_count?userinfo.integral_count:0}}</text>
				</view>
			</view>
		</view>

		<view class="my-content">
			<view class="my-content-list" @click="openArticle">
				<view class="my-content-list-title">
					<uni-icons class="icon" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" color="#666" size="14"></uni-icons>
			</view>
			<view class="my-content-list" @click="feedback">
				<view class="my-content-list-title">
					<uni-icons class="icon" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" color="#666" size="14"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {

			}
		},
		computed:{
			...mapState(["userinfo"])//用户信息
		},
		onLoad() {
			console.log("个人用户数据:",this.userinfo)
		},
		methods: {
			openArticle(){
				uni.navigateTo({
					url:"/pages/my-article/my-article"
				})
			},
			feedback(){
				uni.navigateTo({
					url:"/pages/feedback/feedback"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.my-header {
		position: relative;
		padding-bottom: 15px;
		// border-bottom: 1px solid #eee;

		.my-header-bg {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			filter: blur(8px);
			opacity: 0.3;
			width: 100%;
			height: 100%;
			
			image{
				width: 100%;
				height: 100%;
			}
		}

		.my-header-img {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;

			.my-header-img-box {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-header-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}

		}

		.my-header-info {
			margin-top: 15px;
			display: flex;

			.my-header-info-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				font-size: 12px;
				color: #999;

				.my-header-title {
					font-size: 14px;
					color: #333;
				}

			}

		}
	}

	.my-content{
		margin-top: 30px;
		
		.my-content-list{
			display: flex;
			justify-content: space-between;
			padding: 15px;
			margin-bottom: 10px;
			background-color: #fff;
			color: #333;
			font-size: 14px;
			
			.my-content-list-title{
				display: flex;
				align-items: center;
				.icon{
					margin-right: 10px;
				}
			}
			
		}
		
	}

</style>
