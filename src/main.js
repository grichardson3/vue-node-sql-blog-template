// Dependencies
import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import "bootstrap";

import "./css/styles.scss"

// UI Components
import App from './App.vue';
import LandingPage from './components/LandingPage.vue';
import IndividualPostPage from "./components/IndividualPostPage.vue";
import IndividualAuthorPage from "./components/IndividualAuthorPage.vue";
import IndividualTagPage from "./components/IndividualTagPage.vue";
import SearchResults from "./components/SearchResults.vue";
import NotFound from "./components/NotFound.vue";

// Data Modules
import postsModule from './modules/posts/index.js';
import themeModule from './modules/theme/index.js';
import usersModule from './modules/users/index.js';

const store = createStore({
    modules: {
        posts: postsModule,
        theme: themeModule,
        users: usersModule
    },
    state(){
        return {};
    }
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LandingPage },
        { path: '/post/:id', component: IndividualPostPage },
        { path: '/author/:id', component: IndividualAuthorPage },
        { path: '/tag/:id', component: IndividualTagPage },
        { path: '/search/:id', component: SearchResults },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');