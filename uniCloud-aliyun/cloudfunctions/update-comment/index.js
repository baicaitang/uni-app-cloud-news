'use strict';
const db = uniCloud.database()
// 聚合操作符
const $ = db.command.aggregate
// 查询条件操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {
			user_id,//用户id
			article_id,//文章id
			content,//评论内容
			comment_id="",//回复的评论的id
			reply_id="",//子回复评论的id
			is_reply=false,//是否子回复
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	// 获取用户对象
	user = user.data[0]
	// 获取当前的文章信息
	const article = await db.collection('article').doc(article_id).get()
	
	let commentObj = {
		is_reply:is_reply, // 却分主回复，还是子回复 
		comment_id:genId(5) ,//评论id
		comment_content:content,//评论内容
		create_time:new Date().getTime(),//创建时间
		author:{
			author_id:user_id,//作者id
			author_name:user.author_name,//作者名称
			avatar: user.avatar, // 作者头像
			professional: user.professional // 专业
		},
		replys: []//回复
	}
	
	// 文章下的所有评论
	const comments = article.data[0].comments
	// console.log(comments)
	
	if(comment_id === ''){
		// 评论文章
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
		
	}else{
		// 回复对文章的评论
		// 获取回复的评论的索引	
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		
		let commentAuthor = ""
		
		if(is_reply){
			// 子回复
			// 获取回复作者信息
			commentAuthor = comments[commentIndex].replys.find(item=>item.comment_id === reply_id)
			// console.log("replys:",comments[commentIndex].replys)
			// console.log("子回复",commentAuthor)
		}else{
			// 主回复
			// 获取回复作者信息
		  commentAuthor = comments.find(item => item.comment_id === comment_id)
			// console.log("主回复",commentAuthor)
		}
		
		commentAuthor = commentAuthor.author.author_name //名称
		commentObj.to = commentAuthor //to回复谁(名称)
		
		// 更新后回复信息
		commentObj = {
			[commentIndex]:{//[commentIndex]当前回复的评论
					replys:dbCmd.unshift(commentObj)//追加回复数据
			}
		}	
	}
	/**
			 
			 let commentObj = {
				 0:{	文章回复
					 replys:[  回复评论	
						 {
							 0:{
								 replys:[]
							 },
							 1:{
								 replys:[]
							 }
						 }
					 ]
				 }
			 } 
			 xxx.update({
				 comments : {
					 0: {
						 replys:[]
					 },
					 1:{
						 replys:[]
					 }
				 }
			 })
			 
	 */
	
	// 更新
	await db.collection('article').doc(article_id).update({
			comments: commentObj
		})
	
	
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据更新成功"
	}
};

// 生成评论id
function genId(length){
	let str = Math.random().toString().substr(3,length) + Date.now()
	return Number(str).toString(36)
}