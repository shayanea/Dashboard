import Vue from 'vue'
import Http from 'vue-resource'
import router from '../router/index'

Vue.use(Http)

const config = {
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'emulateJSON':true
};

Vue.http.options.emulateJSON = config['emulateJSON'];

Vue.http.options.headers = {
	'Content-Type': config['Content-Type'],
    'Auth': 'asdasdasdasasdasd'
};

Vue.http.interceptors.push(function (request, next) {
    console.log(request);
	// continue to next interceptor
	next(function (response) {
		if(response.status == 401){
            router.push({ path: '/login' });
		}
	});
});

export default config;