import Vue from 'vue'
import VueRouter from 'vue-router'
import FileManager from "../views/FileManager/views/FileManager";

Vue.use(VueRouter)

const routes = [
  {
    path: '/FileManager',
    name: 'FileManager',
    component: FileManager
  }

]

const router = new VueRouter({
  routes
})

export default router
