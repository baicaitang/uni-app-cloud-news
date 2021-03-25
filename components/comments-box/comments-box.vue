<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header-img">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			
			<view class="comments-header-info" >
				<!-- 主回复 -->
				<view class="title" v-if="!comments.is_reply">
					{{comments.author.author_name}}
				</view>
				<!-- 子回复 -->
				<view class="title" v-else>
					{{comments.author.author_name}}
					<text class="reply-text">回复：</text>
					{{comments.to}}
				
				</view>
				<view class="createtime">
					{{comments.create_time | formatTime }}
				</view>
			</view>
		</view>
		
		<!-- 评论内容 -->
		<view class="comments-content">
			<view class="cont">
				{{comments.comment_content}}
			</view>
			<view class="comments-reply">
				<view type="default" class="reply-btn" @click="commentsReply({comments:comments,is_reply:reply})">回复</view>
			</view>
			<!-- 评论回复区 -->
			<view class="reply-content" v-for="item in comments.replys" :key="item.comment_id">
				<comments-box :comments="item" :reply="true" @reply="commentsReply"></comments-box>
			</view>
		</view>

	</view>
</template>

<script>
	import commentsBox from "@/components/comments-box/comments-box.vue"
	import {parseTime} from "@/utils/index.js"
	export default {
		// 使用递归组件时必须给一个name
		name:"comments-box",
		props:{
			comments:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		filters:{
			// 时间格式化
			formatTime(time){
				return parseTime(time)
			}
		},
		components:{commentsBox},
		data() {
			return {
				
			};
		},
		methods:{
			commentsReply(comment){
				// 为了区分 主回复，还是子回复
				if (comment.is_reply) {
					// 子回复
					// console.log('子回复')
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				// console.log('主回复')
				// console.log(comment)
				this.$emit('reply',comment)
			}
		}
	}
</script>

<style lang="scss">
.comments-box{
	margin: 15px 0;
	
	.comments-header{
		display: flex;
		
		.comments-header-img{
			flex-shrink: 0;
			width: 30px;
			height: 30px;
			border-radius: 5px;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.comments-header-info{
			display: flex;
			flex-direction: column;
			padding-left: 15px;
			color:#999;
			font-size: 12px;
			line-height: 1;
			
			.title{
				margin-bottom:6px;
				font-size: 14px;
				color: #333;
				
				.reply-text{
					margin: 0 10px;
					font-weight: bold;
					color: #000;
				}
			}
		}
	}
	
	.comments-content{
		margin-top: 10px;
		font-size: 14px;
		color: #000;
		
		.comments-reply{
			margin-top: 15px;
			display: flex;
			
			.reply-btn{
				padding: 2px 10px;
				font-size: 12px;
				color: #999;
				border-radius: 20px;
				border: 1px solid #ccc;
			}
		}
		
		.reply-content{
			display: flex;
			margin: 15px 10px;
			padding: 0 10px;
			border: 1px solid #eee;
			border-radius: 5px;
		}
	}
}
</style>
