export default function $http(options){
	let {
		url,data,
	} = options
	
	const dataObj = {
		user_id:"6058a4fcf83a000001d91797",
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