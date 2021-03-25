'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		
	} = event
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	const list = await  db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',userinfo.article_likes_ids])//当前文章id是否在用户article_likes_ids里，存在返回true
	})
	.project({
		content:0
	})
	.match({
		is_like:true//返回is_like为true的文章
	})
	.end()
	
	// console.log(list)
	
	//返回数据给客户端
	return {
		code:200,
		msg:"获取数据成功",
		data:list.data
		}
};
