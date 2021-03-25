'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const {
		user_id
	} = event

	let userinfo = await db.collection('user').doc(user_id).get()

	userinfo = userinfo.data[0]

	let list = await db.collection('user')
		.aggregate()
		.addFields({
			is_like: $.in(['$id', userinfo.author_likes_ids])
		})
		.match({
			is_like: true
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: "作者关注获取",
		data: list.data
	}
};
