import $http from "../http.js"
// 获取标签分类
export const get_label = (data) =>{
	return $http({
		url:'get-label',
		data
	})
}
// 获取文章列表
export const get_list = (data) =>{
	return $http({
		url:'get-list',
		data
	})
}
// 收藏/取消收藏
export const update_likes = (data) =>{
	return $http({
		url:'update-likes',
		data
	})
}
// 搜索数据
export const get_search = (data) =>{
	return $http({
		url:'get-search',
		data
	})
}
// 保存标签页数据
export const update_label = (data) =>{
	return $http({
		url:'update-label',
		data
	})
}

// 文章数据
export const get_detail = (data) =>{
	return $http({
		url:'get-detail',
		data
	})
}

// 发布评论
export const update_comment = (data) =>{
	return $http({
		url:'update-comment',
		data
	})
}

// 获取评论
export const get_comments = (data) =>{
	return $http({
		url:'get-comments',
		data
	})
}

// 取关作者、关注作者
export const update_author = (data) =>{
	return $http({
		url:'update-author',
		data
	})
}
// 是否点赞
export const update_thumbsup = (data) =>{
	return $http({
		url:'update-thumbsup',
		data
	})
}

//收藏文章
export const get_follow = (data) =>{
	return $http({
		url:'get-follow',
		data
	})
}
// 关注作者
export const get_author = (data) =>{
	return $http({
		url:'get-author',
		data
	})
}

// 获取个人信息
export const get_user = (data) =>{
	return $http({
		url:'get-user',
		data
	})
}
// 获取我的文章
export const get_my_article = (data) =>{
	return $http({
		url:'get-my-article',
		data
	})
}

// 更新反馈
export const update_feedback = (data) =>{
	return $http({
		url:'update-feedback',
		data
	})
}