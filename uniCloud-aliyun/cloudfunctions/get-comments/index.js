'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
		user_id,
		article_id,
		page=1,
		pageSize=4
	} = event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id:article_id
	})//筛选目标文章
	.unwind("$comments")//拆分文档
	.project({
		_id:0, //不返回_id
		comments:1 //返回评论
	})
	// 指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点。
	.replaceRoot({
		newRoot:"$comments"
	})
	// 指定查询返回结果时从指定序列后的结果开始返回，常用于分页 
	.skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:"数据请求成功",
		data:list.data
	}
};
