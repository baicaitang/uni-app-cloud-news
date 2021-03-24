<template>
	<view class="icons">
		<!-- 如果父组件有click事件，@click.stop="likeTap"阻止事件冒泡 -->
		<uni-icons :type="like ? 'heart-filled' : 'heart' " size="20" color="#f07373" @click="likeTap"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"likes",
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
				like:false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created(){
			this.like = this.item.is_like
		},
		methods:{
			likeTap(){
				this.like = !this.like
				this.setUpdate()
			},
			setUpdate(){
				uni.showLoading()
				
				this.$api.update_likes({
					// user_id:"6058a4fcf83a000001d91794",
					article_id:this.item._id
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:this.like?"收藏成功":"取消收藏",
						icon:"none"
					})
				}).catch(err=>{
					console.log(err)
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
.icons{
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 20px;
				height: 20px;
				// border: 1px solid red;
			}
</style>
