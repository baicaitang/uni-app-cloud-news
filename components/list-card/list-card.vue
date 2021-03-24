<template>
	<view clss="card" @click="open">
		<!-- 基础卡片 -->
		<view class="list-card" v-if="item.mode === 'base'">
			<view class="list-card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-cont-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-cont-des">
					<view class="list-card-cont-des-label">
						<view class="list-card-cont-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="list-card-cont-des-browe">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
	
		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode === 'column'">
			
			<view class="list-card-content">
				<view class="list-card-cont-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-img">
					<view class="list-card-img-list-item" v-if="index < 3" v-for="(item,index) in item.cover" :key="index">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list-card-cont-des">
					<view class="list-card-cont-des-label">
						<view class="list-card-cont-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="list-card-cont-des-browe">
							{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
	
		<!-- 大图模式 -->
		<view class="list-card mode-img" v-if="item.mode === 'image'">
			<view class="list-card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-cont-title">
					<text>{{item.title}}</text>
					<likes :item="item"></likes>
				</view>
				<view class="list-card-cont-des">
					<view class="list-card-cont-des-label">
						<view class="list-card-cont-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="list-card-cont-des-browe">
							{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"list-card",
		props:{
			item:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 打开详情页
			open(){
				const item = this.item
				this.$emit('click',item)
				// console.log(item)
				const params = {
					_id:item._id,
					title:item.title,
					author:item.author,
					create_time:item.create_time,
					thumbs_up_count:item.thumbs_up_count,
					browse_count:item.browse_count
				}
				// console.log(params)
				
				// 注意参数长度
				uni.navigateTo({
					url:"/pages/home-detail/home-detail?params=" + JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
.list-card{
	display: flex;
	padding: 10px;
	margin: 10px;
	border-radius: 10px;
	box-shadow: 0 0 5px 1px rgba($color: #000000,$alpha:0.1);
	box-sizing: border-box;
	
	.list-card-img{
		flex-shrink: 0;
		height: 60px;
		width: 60px;
		border-radius: 5px;
		overflow: hidden;
		
		image{
			width: 100%;
			height: 100%;
		}
	}
	
	.list-card-content{
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding-left: 10px;
		width: 100%;
		
		.list-card-cont-title{
			position: relative;
			padding-right: 30px;
			font-size: 14px;
			color: #333;
			font-weight: 400;
			line-height: 1.2;
			
			text{
				display: -webkit-box;
				text-overflow:ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		.list-card-cont-des{
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			
			.list-card-cont-des-label{
				display: flex;
				
				.list-card-cont-des-label-item{
					padding: 0 5px;
					margin-right: 5px;
					border-radius: 5px;
					color: $mk-base-color;
					border: 1px solid $mk-base-color;
				}
				
			}
			
			.list-card-cont-des-browe{
				color: #999;
				line-height: 1.8;
			}
			
		}
		
	}

	&.mode-column{
		.list-content{
			width: 100%;
			padding-left: 0;
			
		}
		.list-card-img{
			display: flex;
			margin-top: 10px;
			width: 100%;
			height: 70px;
			
			.list-card-img-list-item{
				margin-left: 10px;
				width: 100%;
				border-radius: 5px;
				overflow: hidden;
				
				&:first-child{
					margin-left: 0;
				}
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.list-card-cont-des{
			margin-top: 10px;
		}
	}
	
	&.mode-img{
		flex-direction: column;
		
		.list-card-img{
			width: 100%;
			height: 100px;
			
		}
		.list-card-content{
			padding-left: 0;
			margin-top: 10rpx;
			
			.list-card-cont-des{
				margin-top: 10px;
				display:flex;
				align-items: center;
			}
		}
	}
}
</style>
