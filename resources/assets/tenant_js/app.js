
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('login-button', require('./components/LoginButtonComponent.vue'));
Vue.component('register-button', require('./components/RegisterButtonComponent.vue'));
Vue.component('remember-password', require('./components/RememberPasswordComponent.vue'));
Vue.component('reset-password', require('./components/ResetPasswordComponent.vue'));
Vue.component('snackbar', require('./components/SnackBarComponent.vue'));
Vue.component('gravatar', require('./components/GravatarComponent.vue'));
Vue.component('users-dashboard', require('./components/users/UsersDashboardComponent.vue'));
Vue.component('users-list', require('./components/users/UsersListComponent.vue'));
Vue.component('user-add', require('./components/users/UserAddComponent.vue'));

Vue.component('staff-list', require('./components/staff/StaffListComponent.vue'));
Vue.component('staff-add', require('./components/staff/StaffAddComponent.vue'));
Vue.component('staff-list-by-family', require('./components/staff/StaffListByFamilyComponent.vue'));
Vue.component('staff-list-by-specialty', require('./components/staff/StaffListBySpecialtyComponent.vue'));
Vue.component('pending-teacher-add', require('./components/teachers/PendingTeacherAddComponent.vue'));

Vue.component('pending-teachers', require('./components/teachers/PendingTeachersComponent.vue'));
Vue.component('teachers', require('./components/teachers/TeachersComponent.vue'));

Vue.component('teachers-photos', require('./components/teachers/TeachersPhotosComponent.vue'));

window.Vuetify = require('vuetify');
Vue.use(Vuetify)

import store from './store'
import * as actions from './store/action-types'
import * as mutations from './store/mutation-types'

import { mapGetters } from 'vuex'
import withSnackbar from './components/mixins/withSnackbar'

if (window.user) {
  store.commit(mutations.USER,  user)
  store.commit(mutations.LOGGED, true)
}

const app = new Vue({
  el: '#app',
  store,
  mixins: [ withSnackbar ],
  data: () => ({
    drawer: null,
    drawerRight: false,
    editingUser: false,
    logoutLoading: false,
    changingPassword: false,
    updatingUser: false,
    items: window.scool_menu
  }),
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    editUser () {
      this.editingUser = true
      this.$nextTick(this.$refs.email.focus)
    },
    updateUser () {
      this.updatingUser = true
      this.$store.dispatch(actions.UPDATE_USER, this.user).then(response => {
        this.showMessage('User modified ok!')
      }).catch(error => {
        console.dir(error)
        this.showError(error)
      }).then(() => {
        this.editingUser = false
        this.updatingUser = false
      })
    },
    updateEmail (email) {
      this.$store.commit(mutations.USER, {...this.user, email})
    },
    updateName (name) {
      this.$store.commit(mutations.USER, {...this.user, name})
    },
    toogleRightDrawer () {
      this.drawerRight = !this.drawerRight
    },
    checkRoles (item) {
      if (item.role) {
        return this.$store.getters.roles.find(function (role) {
          return role == item.role // eslint-disable-line
        })
      }
      return true
    },
    logout () {
      this.logoutLoading = true
      this.$store.dispatch(actions.LOGOUT).then(response => {
        window.location = '/'
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.logoutLoading = false
      })
    },
    menuItemSelected (item) {
      if (item.href) {
        if (item.new) {
          window.open(item.href)
        } else {
          window.location.href = item.href
        }
      }
    },
    changePassword () {
      this.changingPassword = true
      this.$store.dispatch(actions.REMEMBER_PASSWORD, this.user.email).then(response => {
        this.showMessage(`Email sent to change password`)
      }).catch(error => {
        console.dir(error)
        this.showError(error)
      }).then(() => {
        this.changingPassword = false
      })
    }
  }
});
