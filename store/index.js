// vuex状态管理
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyList: uni.getStorageSync('search_history') || [] //保存搜索历史
	},
	mutations:{
		SET_HISTORYLIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state,history){
			state.historyList = []
		}
	},
	actions:{
		set_history({commit,state},history){
			// console.log(history.name.trim().length)
			if(history.name.trim().length === 0) return
			let list = state.historyList
			list.unshift(history)
			
			uni.setStorageSync('search_history',list)
			commit('SET_HISTORYLIST',list)
		},
		claer_history({commit,state}){
			uni.removeStorageSync('search_history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store