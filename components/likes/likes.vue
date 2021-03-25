<template>
	<view class="icons" @click.stop="likeTap">
		<!-- 如果父组件有click事件，@click.stop="likeTap"阻止事件冒泡 -->
		<uni-icons :type="like ? 'heart-filled' : 'heart' " size="20" color="#f07373" ></uni-icons>
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
			},
			// 判断点击收藏是哪一个页面
			types:{
				type:String,
				default:""
			},
		
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
					// 收藏与首页内容关联
					// 只要点击收藏就会触发所有updata_article自定义事件，需要在更新的组件里加判断
					console.log(this.types)
					uni.$emit('updata_article',this.types)
					
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
