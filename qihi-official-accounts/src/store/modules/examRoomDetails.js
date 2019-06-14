const state = {
    currentItem:{
        examRoomName1:'',
        adress1:''
    }
}

const mutations = {
    setCurrentItem(state,item){
        state.currentItem = item;
    }
}

const getters = {
    
}

const actions = {
    setCurrentItem(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('setCurrentItem',item);
    }

}

export default {
    nameSpace:true,
    state,
    mutations,
    getters,
    actions
}