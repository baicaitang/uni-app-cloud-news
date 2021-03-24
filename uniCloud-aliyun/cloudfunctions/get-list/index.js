'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 接收分类,通过分类去筛选数据
	const {
		user_id,
		name,
		page=1,
		pageSize=5
	} = event
	// const list = await db.collection('article')
	// .field({
	// 	content:false //不返回該字段
	// })
	// .get()
	// console.log(name)
	let matchObj = {}
	if(name !== "全部"){
		matchObj = {
			classify:name
		}
	}
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userinfo.data[0].article_likes_ids
	
	// 聚合:更精细化的去处理数据，求和，分组，指定哪些字段
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',article_id_ids])//当前文章id是否存在已收藏文章的id,返回true/false
	})//追加字段
	.match(matchObj)
	.project({
		content:0 //or false
	})
	.skip(pageSize * (page-1))//跳过多少条数据
	.limit(pageSize)//返回多少条数据
	.end()

	
	//返回数据给客户端
	return {
		code:200,
		msg:"数据请求成功",
		data:list.data
	}
};
