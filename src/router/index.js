import Vue from 'vue'
import VueRouter from 'vue-router'
import FileManager from "../views/FileManager/views/FileManager";
import index from "../views/Test/views/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/FileManager',
    name: 'FileManager',
    component: FileManager
  },
  {
    path: '/test',
    name: 'index',
    component: index
  }

]

const router = new VueRouter({
  routes
})

export default router
