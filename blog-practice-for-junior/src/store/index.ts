import { createStore } from 'vuex';
import postModule, { PostModuleState } from './modules/post';

export interface RootState {
  PostModule: PostModuleState;
}

export default createStore({
  modules: { postModule },
});
