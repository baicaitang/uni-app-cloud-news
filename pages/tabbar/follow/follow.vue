<template>
	<view class="follow">
		<!-- 切换导航 -->
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item " :class="{active:activeIndex === 0}" @click="tab(0)">
					收藏文章
				</view>
				<view class="follow-tab-item" :class="{active:activeIndex === 1}" @click="tab(1)">
					关注作者
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="follow-list">
			<swiper class="swiper-item-box" :current="activeIndex" @change="change">
				<!-- 收藏文章 -->
				<swiper-item>
					<view class="swiper-item">
						<scroll-list>
							<uni-load-more status="loading" v-if="list.length === 0 && !articleShow" iconType="snow"></uni-load-more>
							<list-card :types="types" v-for="item in list" :key="item._id" :item="item"></list-card>
							<view style="height: 5px;"></view>
							<view class="noData" v-if="articleShow">
								没有收藏文章
							</view>
						</scroll-list>
					</view>
				</swiper-item>
				<!-- 关注作者 -->
				<swiper-item >
					<view class="swiper-item">
						<scroll-list>
							<uni-load-more status="loading" v-if="authorList.length === 0 && !authorShow" iconType="snow"></uni-load-more>
							<list-author v-for="item in authorList" :item="item"></list-author>
							<view style="height: 5px;"></view>
							<view class="noData" v-if="authorShow">
								没有关注的作者
							</view>
						</scroll-list>	
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list:[],//收藏文章
				articleShow:false,
				authorShow:false,
				types:'follow',
				authorList:[],//作者
			}
		},
		onLoad() {
			// console.log("关注")
			this.getFollow()
			this.getAuhtor()
		},
		created() {
			console.log("关注？？？")
			
			// 收藏与首页内容关联
			// 自定义事件$on智能在打开的页面触发
			uni.$on("update_article",(types)=>{
				console.log(types)
				console.log("关注页面")
				this.getFollow()
			})
			uni.$on('update_author',()=>{
				console.log("关注页面")
				this.getAuhtor()
			})
		},
		methods: {
			tab(index) {
				this.activeIndex = index
			},
			// 获取关注数据
			getFollow(){
				this.$api.get_follow().then(res=>{
					console.log(res)
					const {data} = res
					this.articleShow = data.length === 0? true:false
					this.list = data
					
				}).catch(err=>{
					console.log(err)
				})
			},
			getAuhtor(){
				this.$api.get_author().then(res=>{
					console.log(res)
					this.authorList = res.data
					this.authorShow = res.data.length === 0? true:false
				}).catch(err=>{
					console.log(err)
				})
			},
			change(e){
				this.activeIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		// height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		// border: 1px solid red;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px solid #f5f5f5;

			.follow-tab-box {
				width: 100%;
				height: 100%;
				display: flex;
				border-radius: 5px;
				border: 1px solid $mk-base-color;

				.follow-tab-item {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;
					width: 100%;

					&:first-child {
						border-right: 1px solid $mk-base-color;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.follow-list{
			flex: 1;
			// border: 1px solid red;
			
			.swiper-item-box{
				height: 100%;
				
				.swiper-item{
					height: 100%;
				}
				
			}
			
		}
		
	}
	.noData{
		color: #666;
		padding: 50px;
		font-size: 14px;
		text-align: center;
	}
</style>
