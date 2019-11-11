import api from "../../api";
import _ from "lodash";
import * as types from "../mutation-types";

// initial state
const state = {
	all: [],
	loaded: false,
	menuItem: null
};

// getters
const getters = {
	allMenuItems: state => state.all,
	allMenuItemsLoaded: state => state.loaded,
	menuItem: state => id => {
		let field = "id";
		let menuItem = state.all.filter(menuItem => menuItem[field] === id);
		return !_.isNull(_.first(menuItem)) ? _.first(menuItem) : false;
	},
};

// actions
const actions = {
	getAllMenuItems({ commit }) {
		api.getMenuItems(menuItems => {
			commit(types.STORE_FETCHED_MENU_ITEMS, { menuItems });
			commit(types.MENU_ITEMS_LOADED, true);
			commit(types.INCREMENT_LOADING_PROGRESS);
		});
	}
};

// mutations
const mutations = {
	[types.STORE_FETCHED_MENU_ITEMS](state, { menuItems }) {
		state.all = menuItems;
	},

	[types.MENU_ITEMS_LOADED](state, val) {
		state.loaded = val;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
