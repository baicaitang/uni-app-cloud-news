'use strict';
const db = uniCloud.database()
// 数据库操作符
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		article_id
	} = event
	// 获取用户信息
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userinfo.data[0].article_likes_ids
	let dbCmdFuns = null
	// console.log(article_id_ids.includes(article_id))
	// 添加收藏
	// article_likes_ids:dbCmd.addToSet(article_id)
	// 取消收藏
	// article_likes_ids:dbCmd.pull(article_id)
		if (article_id_ids.includes(article_id)) {
			dbCmdFuns = dbCmd.pull(article_id)
		} else {
			dbCmdFuns = dbCmd.addToSet(article_id)
		}
	
		await db.collection('user').doc(user_id).update({
			article_likes_ids: dbCmdFuns
		})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功',
		data: userinfo.data[0]
	}
	
};
