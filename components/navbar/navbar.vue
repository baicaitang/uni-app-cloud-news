<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 适配不同手机状态栏占位 -->
			<!-- 支付宝小程序不显示 -->
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height:statusBarHeight + 'px'}">
				<!-- #endif -->
				<!-- <view :style="{height:statusBarHeight + 'px'}">	 -->
			</view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :class="{issearch:isSearch}"
				:style="{height:navbarHeight + 'px',width:windowWidth + 'px'}" @click.stop="open">
				<view class="navbar-content-search-icons" @click="back" v-if="isSearch">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view class="navbar-search" v-if="!isSearch">
					<!-- 非搜索页的navbar -->
					<view class="navbar-search-icon">
						<text class="iconfont icon-search"></text>
					</view>
					<view class="navbar-search-text">
						uni-app、vue
					</view>
				</view>
				<view class="navbar-search" v-else>
					<!-- 搜索页的navbar -->
					<input type="text" class="navbar-search-text" v-model="val" @input="inputChange"
						placeholder="请输入搜索内容" />
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight + navbarHeight + 'px'}">
		</view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		data() {
			return {
				statusBarHeight: 20,
				navbarHeight: 45,
				windowWidth: 375,
				val: "",

			};
		},
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			}
		},
		watch: {
			value(newVal) {
				console.log(newVal)
				this.val = newVal
			}
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// console.log(info)
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth


			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 微信小程序获取胶囊位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo)
			this.navbarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
			// #ifdef MP-ALIPAY
			// 支付宝小程序
			this.statusBarHeight = 0
			// #endif
		},
		methods: {
			open() {
				if (this.isSearch) return
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			},
			inputChange(e) {
				// console.log(e)
				const {
					value
				} = e.detail

				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/css/icons.scss";

	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				padding: 0 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				// height: 45px;

				.navbar-search {
					padding: 0 10px;
					height: 30px;
					width: 100%;
					background-color: #fff;
					display: flex;
					align-items: center;
					border-radius: 30px;
					box-sizing: border-box;

					.navbar-search-icon {
						margin-right: 10px;
					}

					.navbar-search-text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}

				&.issearch {
					padding-left: 0;

					.navbar-content-search-icons {
						margin: 0 10px;

					}

					.navbar-search {
						border-radius: 5px;
					}
				}

			}

		}

	}
</style>
