'use strict';

const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		author_id
	} = event
	
	const user = await db.collection('user').doc(user_id).get()
	// console.log(user.data[0].author_likes_ids)
	// 关注作者信息
	const author_likes_ids = user.data[0].author_likes_ids
		
		let author_ids = null
		if(author_likes_ids.includes(author_id)){
			// 取消关注
			author_ids = dbCmd.pull(author_id)
		}else{
			// 关注
			author_ids = dbCmd.addToSet(author_id)//追加到数组
		}

	
	// 更新
	await db.collection('user').doc(user_id).update({
		author_likes_ids:author_ids
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:"关注更新成功",
	}
};
