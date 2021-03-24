'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		value
	} = event
	
	const userinfo = await db.collection('user').doc(user_id).get()
		const article_likes_ids = userinfo.data[0].article_likes_ids
		
	const list  = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	})
	.project({
		content:0
	})
	.match({
		title:new RegExp(value) //按title返回数据
	})
	.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:"数据请求成功",
		data:list.data
	}
};
