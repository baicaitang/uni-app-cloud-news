'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// let label = await db.collection("label").get()
	const {
		user_id	,
		type
	} = event
	
	let matchObj = {}
	if(type !== 'all'){ //不是获取所有标签
		matchObj = {current:true }
	}
	//else 获取所有标签
	
	let userinfo = await db.collection('user').doc(user_id).get()
	// console.log(userinfo)
	userinfo = userinfo.data[0]
	
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		// $.ifNull([userinfo.label_ids,[]]) ,userinfo.label_ids为空则[]
		current:$.in(["$_id",$.ifNull([userinfo.label_ids,[]])])//返回true/false
	})//添加字段
	.match(matchObj)
	.end()
	
	
	console.log(label)
	
	//返回数据给客户端
	return {
		code:200,
		msg:"数据请求成功",
		data:label.data
	}
};
