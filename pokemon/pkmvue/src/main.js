import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

import PokemonDetail from './components/PokemonDetail.vue'
import HomeViews from './views/HomeViews.vue'

const routes = [
    {
        path: '/',
        component: HomeViews
    },
    {
        path: '/pokemon/:name', 
        component: PokemonDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

const app = createApp(App)
app.use(router)
app.mount('#app')
