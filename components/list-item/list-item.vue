<template>
	<scroll-list class="list-scroll" @loadmore="loadmore" >
		<view class="wrap">
			<list-card  v-for="item in list" :key="item._id" :item="item" ></list-card>
			<view style="height: 5px;"></view>
		</view>
		<uni-load-more v-if="list.length > 5 || list.length === 0" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</scroll-list>
</template>

<script>
	export default {
		name:"list-item",
		props:{
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			load:{
				type:Object,
				default:()=>{
					return{
						loading:"loading"
					}
				}
			}
		},
		watch:{

		},
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit("loadmore")
			}
		}
	}
</script>

<style lang="scss">
.list-scroll{
			height: 100%;
			
}
</style>
