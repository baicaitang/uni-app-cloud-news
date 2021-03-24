'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		article_id
	} = event
	
	const user = await db.collection('user').doc(user_id).get()
	
	
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids

	let thumbs_ids = null
	if(thumbs_up_article_ids.includes(article_id)){
		// 取消点赞
		return {
			code:200,
			msg:"已经点过赞了"
		}
	}else{
		// 点赞
		thumbs_ids = dbCmd.addToSet(article_id)
	}
	// 点赞文章
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids:thumbs_ids
	})
	// 点赞数
	await db.collection('article').doc(article_id).update({
		// 减少了请求
		thumbs_up_count:dbCmd.inc(1)//用于指示字段自增某个值
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:"点赞成功",
	}
};
