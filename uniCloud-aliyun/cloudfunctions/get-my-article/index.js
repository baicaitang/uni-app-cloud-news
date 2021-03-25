'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const {
		user_id,

	} = event

	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	let list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(["$_id",userinfo.article_likes_ids]) //是否收藏自己文章
	})
	.match({ //match里不能使用聚合操作符
		id:dbCmd.in(userinfo.article_ids)
	})
	.end()

	//返回数据给客户端
	return {
		code:200,
		msg:"获取我的文章",
		data:list.data
	}
};
