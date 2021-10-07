import { createApp } from 'vue';
import App from '@/App.vue';
import Btn from '@/components/Btn';
import fetchPlugin from '@/plugins/fetch';

const app = createApp(App);
app.use(fetchPlugin, {
  pluginName: '$myName',
});
app.component('Btn', Btn);
app.mount('#app');
