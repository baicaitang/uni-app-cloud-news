<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item" >
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore" ></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name:"list",
		props:{
			tab:Array,
			default:()=>{
				return []
			},
			activeIndex:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				// list:[],
				// listCatchData => { 0:[],2:[],3:[],... }  
				// js的限制，这种数据结构在 listCatchData[index] = data 赋值时不会触发vue渲染更新
				listCatchData:{},//数据缓存
				load:{},//触发上拉数据
				pageSize:5
			};
		},
		watch:{
			tab(newVal){
				// console.log(this.activeIndex)
				if(newVal.length === 0) return
				this.listCatchData = {} //更新数据缓存
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		created() {
			// tab在初始化时可能未能拿到
			// this.getList(0)
			// 文章详情收藏后更新
			uni.$on("update_article",(types)=>{
				console.log(types)
				if(types === 'follow'){
					this.listCatchData = {} //更新页面数据缓存
					this.load = {}
					this.getList(this.activeIndex)
				}
				
			})
		},
		methods:{
			loadmore(){
				if(this.load[this.activeIndex].loading === "noMore") return
				console.log("触发上拉")
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e){	
				let {current} = e.detail
				// console.log(this.tab[current].name)
				// console.log(this.activeIndex)
				this.$emit('change',current)
				// 当数据不存在或长度为0时请求数据
				// console.log(this.listCatchData[current])
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0){
					this.getList(current)
				}
				
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				// console.log(this.load)
				this.$api.get_list({
					page:this.load[current].page,
					pageSize:this.pageSize,
					name:this.tab[current].name
				}).then(res=>{
					// console.log(res)
					let {data} = res
					// 直接赋值,在选项卡转换时会先把之前的数据替换,有闪顿
					// this.list = data
					// listCatchData => { 0:[],2:[],3:[],... }
					// this.listCatchData[current] = data 
					// 数据懒加载
					// $set(改变的数组，修改第几项，修改内容) 会通知页面这个数组或对象发生了变化，帮我们刷新页面
					 
					 // 上拉加载更多数据
					 if(data.length === 0){
						 let oldLoad = {}
						 oldLoad.loading = 'noMore'
						 oldLoad.page = this.load[current].page
						 this.$set(this.load,current,oldLoad)
						 // 强制渲染页面
						 this.$forceUpdate()
						 return
					 }
					 // 第一次加载时this.listCatchData[current] = {} undefined，需传一个[]
					 let oldlist = this.listCatchData[current] || []
					 oldlist.push(...data)
					this.$set(this.listCatchData,current,oldlist) 
					
					console.log("请求数据：",this.listCatchData)
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
.home-swiper{
	height: 100%;
	
	.swiper-item{
		height: 100%;
		overflow: hidden;
		
	}
}
</style>
