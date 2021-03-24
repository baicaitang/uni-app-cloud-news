<template>
	<view class="home-search">
		<navbar :isSearch="true" :value="value" @input="inputChange" ></navbar>
		<view class="search-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistory">清空</text>
				</view>
				<view class="label-content" v-if="historyList.length > 0">
					<view class="label-cont-item" v-for="(item,index) in historyList" :key="index" @click="openHistroy(item)">
						{{item.name}}
					</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<scroll-list class="list-scroll"  v-else>
				<uni-load-more v-if="loading" iconType="snow" status="loading"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-card  v-for="(item,index) in searchList" :key="item._id" :item="item" @click="setHistory" ></list-card>
				</view>
				<view style="height: 5px;"></view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
									没有搜索到相关数据
				</view>
			</scroll-list>

		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				value:"",
				searchList:[],
				is_history:true,
				loading:false,
			
			}
		},
		computed:{
			...mapState(['historyList']) //映射数据源
		},
		methods: {
			// 点击打开搜索出来的卡片会保存历史记录
			setHistory(){
				console.log('clickCard?',this.value)
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			openHistroy(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			clearHistory(){
				this.$store.dispatch('claer_history')
				uni.showToast({
					title:"清空完成"
				})
			},
			inputChange(val){
				// console.log(val)
				
				this.value = val
				// 限制输入内容时一直请求数据(次数)
				if(!val){
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(val)
					return
				}
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=>{
						this.mark = false
						this.getSearch(val)
					},1000)
				}
				
			},
			getSearch(value){
				// console.log(value)
				if(!value){
					this.searchList = []
					this.is_history = true
					// this.$forceUpdate()
					return
				}
				this.is_history = false
				this.loading = true
				this.$api.get_search({
					value
				}).then(res=>{
					console.log(res)
					let {data} = res
					this.loading = false
					this.searchList = data
					 
				}).catch(err=>{
					console.log(err)
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
	background-color: #f5f5f5;
}
.home-search{
	
	.search-list{
		display: flex;
		flex-direction: cloumn;
		flex: 1;
		width: 100vw;
		box-sizing: border-box;
		// border: 1px solid red;
		
		.label-box{
			width:100%;
			background-color: #fff;
			margin-bottom: 10px;
			
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				
				.label-title{
					color: $mk-base-color;
				}
				
				.label-clear{
					color: #30b33a;
					font-weight: bold;
				}
			}
			
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15rpx;
				padding-top: 0;
				
				.label-cont-item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
			
		}
	}
}
.no-data{
				height: 200px;
				line-height: 200px;
				width: 100%;
				text-align: center;
				color: #666;
				font-size: 12px;
}
</style>
