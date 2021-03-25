<template>
	<view class="wrap">
		<view class="list-author">
			<view class="list-author-img">
				<image :src="item.avatar" mode=""></image>
			</view>
			<view class="list-author-content">
				<view class="list-author-title">
					{{item.author_name}}
				</view>
				<view class="list-author-des">
					<view class="list-author-des-label">
						{{item.professional}}
					</view>
					<view class="list-author-des-info">
						<text>发帖 {{item.article_ids.length}}</text>
						<text>粉丝 {{item.fans_count}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"list-author",
		data() {
			return {
				
			};
		},
		props:{
			item:{
				type:Object,
				default:()=>{
					return{}
				}
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.list-author{
	padding: 15px 0;
	display: flex;
	margin: 0 10px;
	border-radius: 5px;
	box-sizing: border-box;
	border-bottom: 1px solid #F5F5F5;
	
	.list-author-img{
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		overflow: hidden;
		border-radius: 5px;
		
		image{
			height: 100%;
			width: 100%;
		}
	}
	
	.list-author-content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10px;
		width: 100%;
		
		.list-author-title{
			position: relative;
			padding-right:30px;
			font-size: 14px;
			color: #333;
			font-weight: bold;
			line-height: 1.2;
		}
		
		.list-author-des{
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			
			.list-author-des-label{
				color: #666;
			}
			
			.list-author-des-info{
				color: #999;
				line-height: 1.5;
				
				text{
					
					&:first-child{
						margin-right: 10px;
					}
				}
			}
			
		}
		
	}
	
}
</style>
