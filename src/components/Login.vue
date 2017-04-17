<template>
	<div id="Login">
		<div class="container">
			<div class="row">
				<div class="col-md-9 col-sm-8 col-xs-12 shadow_box">
					<div class="loader" v-show="ShowLoader">
						<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
							<path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(137.96 25 25)">
								<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
							</path>
						</svg>
					</div>
					<div class="row">
						<div class="col-md-8 col-sm-7 col-xs-12 login_bg" v-bind:class="{ hide_login_bg : Success }">
						</div>
						<div class="col-md-4 col-sm-5 col-xs-12 login_side" v-bind:class="{ center_login_side : Success }">
							<img src="../assets/login_logo.png" class="login_logo" />
							<h2>سیستم مدیریت وب سایت</h2>
							<form class="login_form" @submit.prevent="Login">
								<input type="text" class="form-control" v-on:focus="RemovePlaceholder" v-on:blur="AddPlaceholder"
								placeholder="نـام کاربـــری" data-placeholder="نـام کاربـــری" v-model="model.username" 
								minlength="2" maxlength="50" />
								<input type="password" class="form-control" v-on:focus="RemovePlaceholder"  v-on:blur="AddPlaceholder"
								placeholder="رمـز ورود به سامـانه" data-placeholder="رمـز ورود به سامـانه" v-model="model.password" 
								minlength="2" maxlength="50" />
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
export default {
	name: 'login',
	data() {
		return {
			ShowLoader: false,
			Success : false,
			model:{
				username: '',
				password: ''
			}
		}
	},
	created() {
		document.title = "login";
	},
	methods:{
		RemovePlaceholder : function(e){
			e.target.placeholder = '';
		},
		AddPlaceholder : function(e){
			e.target.placeholder = e.target.attributes['data-placeholder'].value;
		},
		Login : function(e){
			this.ShowLoader = true;
			// this.Success = true;
		}
	}
}
</script>

<style>
#Login .container .row [class*=' col-'] {
	min-height: 550px;
}

#Login .shadow_box {
	position: absolute;
    left: 50%;
    top: 50%;
    -o-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.login_side{
	background-color: #fff;
	padding-top: 70px;
}

.login_bg{
	background-image: url('../assets/bg.jpg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}

.login_logo{
	width: 130px;
	height: auto;
	display: block;
	margin: 0 auto;
}

.login_side h2{
	font-size: 1.1em;
	text-align: center;
	color: #999;
}
.login_form{
	width: 180px;
	display: block;
	margin: 70px auto;
}
.login_form .form-control{
	border:0px;
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
}
.login_form .form-control:nth-child(1){
	border-bottom: 1px solid #cccccc;
	background-image: url('../assets/user.svg');
}
.login_form .form-control:nth-child(2){
	background-image: url('../assets/pass.svg');
}
.login_form .btn{
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
.login_form .btn:active{
	background-color: #cecece;
}
.login_form .btn:after{
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
.hide_login_bg{
	-webkit-animation: HideBg .5s forwards;
	-moz-animation: HideBg .5s forwards;
	-o-animation: HideBg .5s forwards;
	animation: HideBg .5s forwards;
}
@-webkit-keyframes HideBg {
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
@-moz-keyframes HideBg {
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
@-o-keyframes HideBg {
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
@keyframes HideBg {
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}
/*.center_login_side{
	position: absolute;
	left: 50%;
	-webkit-transform: translate(-50%, 0%);
	-moz-transform: translate(-50%, 0%);
	-o-transform: translate(-50%, 0%);
    transform: translate(-50%, 0%);
	-webkit-transition: all .4s ease;
    -moz-transition: all .4s ease;
    -o-transition: all .4s ease;
    -ms-transition: all .4s ease;
    transition: all .4s ease;
	-webkit-transition-delay: .6s;
	-moz-transition-delay: .6s;
	-o-transition-delay: .6s;
	transition-delay: .6s;
}*/
.loader{
    position: absolute;
    top: 0;
	right: 0;
	left: 0;
	bottom: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
}
.loader svg{
    position: absolute;
    left: 50%;
    top: 50%;
    height: 50px;
    width: 50px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>
