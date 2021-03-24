<template>
	<view class="home">
		<navbar :isSearch="false" :value="''"></navbar>
		<tabs :list="labelList" :tabIndex="tabIndex" @tab="tab"></tabs>
		<view class="home-list">
			<list :tab="labelList" :activeIndex="activeIndex" @change="change" ></list>
		</view>
		
	</view>
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				labelList:[],
				tabIndex:0,
				activeIndex:0,
			}
		},
		onLoad() {
			this.getLabel()
			// 监听标签更新完成
			uni.$on('labelChange',(res)=>{
				this.labelList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
			
		},
		methods: {
			// 获取tab数据
			getLabel(){
				this.$api.get_label().then(res=>{
					
					let {data} = res	
					data.unshift({
						name:"全部"
					})
					// console.log("标签:" , res.data)
					this.labelList = data
				}).catch(err=>{
					console.log(err)
				})
			},
			// 点击tab处理对应的内容
			tab({data,index}){
				// console.log(index)
				this.activeIndex = index
			},
			change(current){
				// console.log(current)
				this.tabIndex = current
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
}
.home{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	
	.home-list{
		flex: 1;
		box-sizing:border-box;
	}
}
</style>
