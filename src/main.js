// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import VeeValidate from 'vee-validate'
import HttpConfig from './helper/http'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.use(VeeValidate)

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBJjpRyCCYEXaG7ZuLDFJJkQr6OGw9L5CM',
		libraries: 'places'
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})
