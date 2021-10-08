import { createStore } from 'vuex';
import message from '@/store/message';
import count from '@/store/count';

export default createStore({
  state() {
    return {
      msg: 'store Vue?!',
      count: 1,
    };
  },
  modules: {
    message,
    count,
  },
});
