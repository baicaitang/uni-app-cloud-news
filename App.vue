<script>
	export default {
		onLaunch: function() { //应用启动时触发，全局只触发一次
			// 获取个人用户信息 --- 模拟登录
			this.$api.get_user({
				user_id:"6058a4fcf83a000001d91794"
			}).then(res=>{
				console.log(res)
				// 持久化存储
				this.$store.dispatch("set_userinfo",res.data)
				
			}).catch(err=>{
				console.log(err)
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 富文本 */
@import 'components/gaoyia-parse/parse.css';
</style>
