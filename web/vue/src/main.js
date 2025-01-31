// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small', zIndex: 3000})

Vue.directive('focus', {
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.prototype.$appConfirm = function (callback) {
  this.$confirm('确定执行此操作?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callback()
  })
}

Vue.prototype.$appConfirm2 = function (callback, action) {
  let title = '提示'
  let content = '确定要 ' + action + ' ?'
  let confirmBtn = '确定'
  let cancelBtn = '取消'

  this.$confirm(content, title, {
    confirmButtonText: confirmBtn,
    cancelButtonText: cancelBtn,
    type: 'warning'
  }).then(() => {
    callback()
  })
}

Vue.prototype.$appConfirm3 = function (callback, title, content, confirmBtn, cancelBtn) {
  title = title || '提示'
  content = content || '确定执行此操作?'
  confirmBtn = confirmBtn || '确定'
  cancelBtn = cancelBtn || '取消'

  this.$confirm(content, title, {
    confirmButtonText: confirmBtn,
    cancelButtonText: cancelBtn,
    type: 'warning'
  }).then(() => {
    callback()
  })
}

Vue.filter('formatTime', function (time) {
  const fillZero = function (num) {
    return num >= 10 ? num : '0' + num
  }
  const date = new Date(time)

  const result = date.getFullYear() + '-' +
    (fillZero(date.getMonth() + 1)) + '-' +
    fillZero(date.getDate()) + ' ' +
    fillZero(date.getHours()) + ':' +
    fillZero(date.getMinutes()) + ':' +
    fillZero(date.getSeconds())

  if (result.indexOf('20') !== 0) {
    return ''
  }

  return result
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
