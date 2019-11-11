import api from "../../api";
import _ from "lodash";
import * as types from "../mutation-types";
import { isNumber } from "util";

// initial state
const state = {
	all: [],
	loaded: false,
	cake: null
};

// getters
const getters = {
	allCakes: state => state.all,
	allCakesLoaded: state => state.loaded,
	cake: state => id => {
		let field = typeof id === "number" ? "id" : "slug";
		let cake = state.all.filter(cake => cake[field] === id);
		return !_.isNull(_.first(cake)) ? _.first(cake) : false;
	},
	cakeContent: state => id => {
		let field = typeof id === "number" ? "id" : "slug";
		let cake = state.all.filter(cake => cake[field] === id);
		return !_.isNull(_.first(cake).content.rendered)
			? _.first(cake).content.rendered
			: false;
	},
	someCakes: state => limit => {
		if (state.all.length < 1) {
			return false;
		}
		let all = [...state.all];
		return all.splice(0, Math.min(limit, state.all.length));
	}
};

// actions
const actions = {
	getAllCakes({ commit }) {
		api.getCakes(cakes => {
			commit(types.STORE_FETCHED_CAKES, { cakes });
			commit(types.CAKES_LOADED, true);
			commit(types.INCREMENT_LOADING_PROGRESS);
		});
	}
};

// mutations
const mutations = {
	[types.STORE_FETCHED_CAKES](state, { cakes }) {
		state.all = cakes;
	},

	[types.CAKES_LOADED](state, val) {
		state.loaded = val;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
