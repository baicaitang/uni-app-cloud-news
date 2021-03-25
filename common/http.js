import store from "../store/index.js";

export default function $http(options){
	let {
		url,data,
	} = options
	
	// 获取状态管理的用户信息
	
	const dataObj = {
		user_id:store.state.userinfo._id,
		...data
	}
	// console.log(options)
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name:url,
			data:dataObj
		}).then(res=>{
			if(res.result.code === 200){
				resolve(res.result)
			}else{
				reject(res.result)
			}
		}).catch(err=>{
			reject(err)
		})
		
	})
}