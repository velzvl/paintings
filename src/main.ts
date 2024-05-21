import { createApp } from 'vue';

import router from '@/router';
import App from '@/App.vue';
import { setupStore } from '@/stores/idnex';

const app = createApp(App);

setupStore(app);
app.use(router);

app.mount('#app');
