<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					我的标签
				</view>
				<view class="label-edit" @click="editLabel">
					{{is_edit ? "完成":"编辑"}}
				</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-cont-item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons type="clear" size="20" color="red" class="icon-close" v-if="is_edit" @click="del(index)"></uni-icons>
				</view>
			</view>
			<view class="no-data" v-if="labelList.length  === 0 && !loading">
				当前没有数据
			</view>		
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					标签推荐
				</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-cont-item" v-for="(item,index) in list" :key="item._id" @click="add(index)">
				{{item.name}}
				</view>
			</view>
			<view class="no-data" v-if="labelList.length  === 0 && !loading">
				当前没有数据
			</view>
		</view>
		<!-- <button type="default" @click="emit">refresh</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit:false,
				labelList:[],//我的标签
				list:[],//推荐标签
				loading:false,
			}
		},
		onLoad() {	
			this.getLabel()
		},
		methods: {
			emit(){
					// 自定义事件
				// 通知首页刷新数据
				uni.$emit('labelChange')
			},
			editLabel(){
				if(this.is_edit){
					// 正在编辑
					this.is_edit = false
					this.updateLabel(this.labelList)
				}else{
					this.is_edit = true
				}
			},
			getLabel(){
				this.loading = true
				this.$api.get_label({
					type:'all'
				}).then(res=>{
					console.log(res)
					const {data} = res
					this.labelList = data.filter(item=>item.current) //true
					this.list = data.filter(item=>!item.current) //false
					this.loading = false
				}).catch(err=>{
					console.log(err)
					this.loading = false
				})
			},
			del(index){
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			add(index){
				if(!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			},
			// 更新标签
			updateLabel(label){
				// let arr = []
				// label.forEach(item=>{
				// 	arr.push(item._id)
				// })
				let arr = label.map(item=>{
					return item._id
				})
				// console.log(arr)
				uni.showLoading()

				this.$api.update_label({
					label:arr
				}).then(res=>{
					console.log(res)
					this.emit()
					uni.hideLoading()
					uni.showToast({
						title:"更新成功",
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
page{
	background-color: #f5f5f5;
}

.label{
	.label-box{
		background-color: #fff;
		margin-bottom: 10px;
		
		.label-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			padding: 10px 15px;
			border-bottom: 1px solid #f5f5f5;
			
			.label-edit{
				color: #30b33a;
				font-weight: bold;
			}
		}
		
		.label-content{
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0;
			
			.label-cont-item{
				position: relative;
				padding: 4px 8px;
				margin-top:12px;
				margin-right: 10px;
				border: 1px solid #666;
				border-radius: 5px;
				font-size: 14px;
				color: #666;
				
				.icon-close{
					position: absolute;
					top: -10px;
					right: -10px;
					background-color: #fff;
					border-radius: 50%;
					
				}
			}
		}
	}
}
.no-data{
	text-align: center;
	padding: 50px 0;
	color: #999;
	font-size: 14px;
	width: 100%;
}
</style>
