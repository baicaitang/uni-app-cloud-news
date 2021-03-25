<template>
	<view>
		<view class="wrap">
			<uni-load-more v-if="loading" status="loading"></uni-load-more>
			<list-card v-for="item in list" :key="item._id" :item="item"></list-card>
		</view>
		<view class="noData" v-if="list.length === 0 && !loading">
			没有文章
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				loading:true
			}
		},
		onLoad() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle(){
				this.loading = true
				this.$api.get_my_article().then(res=>{
					console.log(res)
					this.loading = false
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
.noData{
	color: #666;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30px;
}
</style>
