import { createApp } from 'vue';
import App from '@/App.vue';
import Btn from '@/components/Btn';

const app = createApp(App);
app.component('Btn', Btn);
app.mount('#app');
