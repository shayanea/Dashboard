<template>
	<div id="Login">
		<div class="container">
			<div class="row">
				<div class="col-md-9 col-sm-8 col-xs-12 shadow_box" v-bind:class="{ remove_shadow : Success }">
					<div class="loader" v-show="ShowLoader">
						<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
							<path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(137.96 25 25)">
								<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
							</path>
						</svg>
					</div>
					<div class="row">
						<div class="col-md-8 col-sm-7 col-xs-12 login_bg" v-bind:class="{ fade_login_bg : Success }">
							<error :status="alert.status" :text="alert.message"></error>
						</div>
						<div class="col-md-4 col-sm-5 col-xs-12 login_side" v-bind:class="{ fade_login_form : Success }">
							<img src="../assets/login_logo.png" class="login_logo"/>
							<h2>سیستم مدیریت وب سایت</h2>
							<form class="login_form" @submit.prevent="Login">
								<input type="text" class="form-control" v-on:focus="RemovePlaceholder" v-on:blur="AddPlaceholder" 
								placeholder="نـام کاربـــری" data-placeholder="نـام کاربـــری" v-model="model.username" minlength="2" maxlength="50"
								name="username" v-validate="'required|min:4'" :class="{'input': true, 'error_input': errors.has('username')}" />
								<input type="password" class="form-control" v-on:focus="RemovePlaceholder" v-on:blur="AddPlaceholder" 
								placeholder="رمـز ورود به سامـانه" data-placeholder="رمـز ورود به سامـانه" v-model="model.password" 
								name="password" v-validate="'required|min:4'" :class="{'input': true, 'error_input': errors.has('password')}" minlength="2" maxlength="50" />
								<button type="submit" class="btn btn-block">ورود بـه سامــانه</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Error from './LoginError'
import Stage from '../Stage'

export default {
	name: 'login',
	data() {
		return {
			ShowLoader: false,
			Success: false,
			Submit: false,
			model: {
				username: '',
				password: ''
			},
			alert: {
				status: false,
				message: ''
			}
		}
	},
	created() {
		document.title = "صفحه ورود کاربران";
	},
	components: {
		'error': Error
	},
	methods: {
		RemovePlaceholder: function (e) {
			e.target.placeholder = '';
		},
		AddPlaceholder: function (e) {
			e.target.placeholder = e.target.attributes['data-placeholder'].value;
		},
		Login: function (e) {
			this.$validator.validateAll().then(result => {
                if (result) {
                    this.alert.status = false;
					this.ShowLoader = true;
					this.$http.post('http://panel.hex.team/api', {
						username: this.model.username,
						password: this.model.password,
						api:'login'
					}).then(function(response) {
						this.ShowLoader = false;
						if (response.status == 200) {
							this.Success = true;
							localStorage.setItem('Authorization', response.body.token);
							var self = this;
							setTimeout(function () {
								self.$router.push({ path: '/about' });
							}, 1000);
						}
					}, function(response) {
						this.ShowLoader = false;
						this.alert.status = true;
						if (response.status == 404 || response.status == 400) {
							this.alert.message = "رمز عبور / نام کاربری شما اشتباه است."
						}
					});
                }
            });
			// Stage[0].config.api + 'api.php'
			
		}
	}
}
</script>

<style>
#Login .container .row [class*=' col-'] {
	min-height: 550px;
	max-height: 550px;
}

#Login .shadow_box {
	position: absolute;
	left: 50%;
	top: 50%;
	-o-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	overflow: hidden;
	-webkit-animation: ShowShadow .1s forwards 2s;
	-moz-animation: ShowShadow .1s forwards 2s;
	-o-animation: ShowShadow .1s forwards 2s;
	animation: ShowShadow .1s forwards 2s;
}

@-webkit-keyframes ShowShadow {
	0% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
	}
	100% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}
}

@-moz-keyframes ShowShadow {
	0% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
	}
	100% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}
}

@-o-keyframes ShowShadow {
	0% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
	}
	100% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}
}

@keyframes ShowShadow {
	0% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0);
	}
	100% {
		-webkit-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		-o-box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}
}

.remove_shadow {
	-webkit-animation: ShowShadow .1s reverse!important;
	-moz-animation: ShowShadow .1s reverse!important;
	-o-animation: ShowShadow .1s reverse!important;
	animation: ShowShadow .1s reverse!important;
}

.fade_login_form {
	opacity: 1!important;
	-webkit-animation: MoveToCenter .5s forwards, HideFromCenter .3s forwards .6s !important;
	-moz-animation: MoveToCenter .5s forwards, HideFromCenter .3s forwards .6s !important;
	-o-animation: MoveToCenter .5s forwards, HideFromCenter .3s forwards .6s !important;
	animation: MoveToCenter .5s forwards, HideFromCenter .3s forwards .6s !important;
}

@-webkit-keyframes HideFromCenter {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-moz-keyframes HideFromCenter {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-o-keyframes HideFromCenter {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes HideFromCenter {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-webkit-keyframes MoveToCenter {
	0% {
		position: absolute;
		right: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
	100% {
		position: absolute;
		right: 50%;
		-o-transform: translate(50%, 0%);
		-moz-transform: translate(50%, 0%);
		-webkit-transform: translate(50%, 0%);
		transform: translate(50%, 0%);
	}
}

@-moz-keyframes MoveToCenter {
	0% {
		position: absolute;
		right: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
	100% {
		position: absolute;
		right: 50%;
		-o-transform: translate(50%, 0%);
		-moz-transform: translate(50%, 0%);
		-webkit-transform: translate(50%, 0%);
		transform: translate(50%, 0%);
	}
}

@-o-keyframes MoveToCenter {
	0% {
		position: absolute;
		right: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
	100% {
		position: absolute;
		right: 50%;
		-o-transform: translate(50%, 0%);
		-moz-transform: translate(50%, 0%);
		-webkit-transform: translate(50%, 0%);
		transform: translate(50%, 0%);
	}
}

@keyframes MoveToCenter {
	0% {
		position: absolute;
		right: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
	100% {
		position: absolute;
		right: 50%;
		-o-transform: translate(50%, 0%);
		-moz-transform: translate(50%, 0%);
		-webkit-transform: translate(50%, 0%);
		transform: translate(50%, 0%);
	}
}

.login_side {
	background-color: #fff;
	padding-top: 70px;
	opacity: 0;
	-webkit-animation: ShowFromNone .5s forwards 1s, StartFromCenter .5s forwards 1.5s;
	-moz-animation: ShowFromNone .5s forwards 1s, StartFromCenter .5s forwards 1.5s;
	-o-animation: ShowFromNone .5s forwards 1s, StartFromCenter .5s forwards 1.5s;
	animation: ShowFromNone .5s forwards 1s, StartFromCenter .5s forwards 1.5s;
}

@-webkit-keyframes ShowFromNone {
	0% {
		opacity: 0;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
}

@-moz-keyframes ShowFromNone {
	0% {
		opacity: 0;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
}

@-o-keyframes ShowFromNone {
	0% {
		opacity: 0;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
}

@keyframes ShowFromNone {
	0% {
		opacity: 0;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
}

@-webkit-keyframes StartFromCenter {
	0% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		right: 0%;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@-moz-keyframes StartFromCenter {
	0% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		right: 0%;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@-o-keyframes StartFromCenter {
	0% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		right: 0%;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@keyframes StartFromCenter {
	0% {
		opacity: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		-o-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		-webkit-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		right: 0%;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

.login_bg {
	background-image: url('../assets/bg.jpg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	opacity: 0;
	-webkit-animation: StartFromCenterBack .5s forwards 1.6s;
	-moz-animation: StartFromCenterBack .5s forwards 1.6s;
	-o-animation: StartFromCenterBack .5s forwards 1.6s;
	animation: StartFromCenterBack .5s forwards 1.6s;
}

@-webkit-keyframes StartFromCenterBack {
	0% {
		position: absolute;
		top: 50%;
		left: 50%;
		-o-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@-moz-keyframes StartFromCenterBack {
	0% {
		position: absolute;
		top: 50%;
		left: 50%;
		-o-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@-o-keyframes StartFromCenterBack {
	0% {
		position: absolute;
		top: 50%;
		left: 50%;
		-o-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

@keyframes StartFromCenterBack {
	0% {
		position: absolute;
		top: 50%;
		left: 50%;
		-o-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	100% {
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		-o-transform: translate(0%, 0%);
		-moz-transform: translate(0%, 0%);
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
	}
}

.fade_login_bg {
	opacity: 1;
	position: absolute;
	left: 0;
	animation: HideFromLeft .3s forwards .2s;
}

@keyframes HideFromLeft {
	0% {
		opacity: 1;
		-webkit-transform: translate(0%, 0%);
		transform: translate(0%, 0%);
		
	}
	100% {
		opacity: 0;
		width: 30%;
		-webkit-transform: translate(50%, 0%);
		transform: translate(50%, 0%);
	}
}

.login_logo {
	width: 130px;
	height: auto;
	display: block;
	margin: 0 auto;
}

.login_side h2 {
	font-size: 1.1em;
	text-align: center;
	color: #999;
}

.login_form {
	width: 180px;
	display: block;
	margin: 70px auto;
}

.login_form .form-control {
	border: 0px;
	direction: rtl;
	padding: 30px 0;
	padding-right: 40px;
	color: #555;
	font-size: 13px;
	box-shadow: none;
	outline: none;
	border-radius: 0;
	position: relative;
	background-repeat: no-repeat;
	background-position: right center;
	background-size: 25px;
	-moz-box-sizing: initial;
}

.login_form .form-control:nth-child(1) {
	border-bottom: 1px solid #cccccc;
	background-image: url('../assets/user.svg');
}

.login_form .form-control:nth-child(2) {
	background-image: url('../assets/pass.svg');
}

.login_form .btn {
	background-color: #E1E1E1;
	color: #8E8E8E;
	font-size: 14px;
	font-weight: bold;
	margin: 50px auto;
	border-radius: 6px;
	position: relative;
	outline: none;
	box-shadow: none;
}

.login_form .btn:hover,
.login_form .btn:focus,
.login_form .btn:active {
	background-color: #cecece;
}

.login_form .btn:after {
	content: '';
	position: absolute;
	left: 20px;
	top: 35%;
	width: 10px;
	height: 10px;
	background-image: url('../assets/left-arrow.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 20px;
}

.hide_login_bg {
	-webkit-animation: HideBg .5s forwards;
	-moz-animation: HideBg .5s forwards;
	-o-animation: HideBg .5s forwards;
	animation: HideBg .5s forwards;
}

@-webkit-keyframes HideBg {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-moz-keyframes HideBg {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@-o-keyframes HideBg {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes HideBg {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.loader {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
}

.loader svg {
	position: absolute;
	left: 50%;
	top: 50%;
	height: 50px;
	width: 50px;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.error_input{
	border-bottom:1px solid #D91E18!important;
}
</style>
