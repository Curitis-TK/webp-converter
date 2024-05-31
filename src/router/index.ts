import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('/@/views/index.vue')
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach(() => {
  removeStartupLoading()
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

function removeStartupLoading() {
  const el = document.getElementById('AppLoading')
  if (!el) return

  el.style.opacity = '0'
  el.style.transition = '0.3s'
  el.style.pointerEvents = 'none'

  setTimeout(() => {
    el.remove()
  }, 50)
}
