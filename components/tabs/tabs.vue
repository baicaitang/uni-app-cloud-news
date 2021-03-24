<template>
	<view class="tab">
		<scroll-view  scroll-x class="tab-scroll" >
			<view class="tab-scroll-wrap">
				<view class="tab-scroll-item" v-for="(item,index) in list" :key="index" :class="{active:activeIndex === index}" @click="clickTab(item,index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabs",
		props:{
			list:{
				type: Array,
				default () {
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		watch:{
			tabIndex(newVal,oldVal){
				// console.log(newVal+'---'+oldVal)
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		methods:{
			clickTab(item,index){
				this.activeIndex = index
				this.$emit('tab',{
					data:item,
					index:index
				})
			},
			open(){
				uni.navigateTo({
					url:"/pages/home-label/home-label"
				})
			}
		}
	}
</script>

<style lang="scss">
.tab{
	display: flex;
	width: 100%;
	background-color: #fff;
	border-bottom: 1px solid #f5f5f5;
	box-sizing: border-box;
	
	.tab-scroll{
		flex:1;
		overflow: hidden;
		
		.tab-scroll-wrap{
			display: flex;
			align-items: center;
			flex-wrap: nowrap;//不换行
			height: 45px;
			box-sizing: border-box;
			
			.tab-scroll-item{
				color: #333;
				padding: 0 14px;
				flex-shrink: 0;//内容不挤压
				
				&.active{
					color: $mk-base-color;
				}
			}
		}
	}
	
	.tab-icons{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45px;
		
		&::after{
			position: absolute;
			content: "";
			top: 12px;
			bottom: 12px;
			left: 0;
			width: 1px;
			background-color: #ddd;
		}
	}
}
</style>
