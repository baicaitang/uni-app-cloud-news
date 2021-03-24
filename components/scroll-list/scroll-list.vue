<template>
	<view class="scroll">
		<scroll-view scroll-y class="scroll-wrap" @scrolltolower="loadmore">
			<view>
				<!-- 插槽 -->
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"scroll-list",
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
.scroll{
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		
		.scroll-wrap{
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
