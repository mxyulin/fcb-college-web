import { getList } from "@/api/product/product";

export default {
  namespaced: true,
  actions: {
    async getList({commit}, {current, size, params = {}}) {
      let result = await getList(current, size, params);
      if (result.code == 200) {
        commit("GETLIST", result.data);
        return 'ok';
      }
      return Promise.reject(new Error('faile'))
    }
  },
  mutations: {
    GETLIST(state, data) {
      state.goodsData = data;
    }
  },
  state: {
    goodsData: [],
  },
  getters: {}
}
