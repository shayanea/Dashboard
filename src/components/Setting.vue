<template>
    <div class="setting_list">
        <div class="loader" v-show="ShowLoader">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(137.96 25 25)">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        </div>
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
        <div class="content_holder">
            <form @submit.prevent="Save">
                <div class="col-md-3 col-sm-3 col-xs-12"></div>
                <div class="col-md-9 col-sm-9 col-xs-12">
                    <h4 class="form_title">
                        تدوین تنظیمات
                    </h4>
                    <p class="form_desc">
                        با استفاده از این فرم شما می توانید اطلاعات کاربری خود را تدوین کنید.
                    </p>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">رمز عبور فعلی</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="oldpassword" type="password" v-model="oldpassword" placeholder="رمز عبور جدید" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">رمز عبور جدید</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="password" type="password" v-model="password" placeholder="رمز عبور جدید" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12"> تایید رمز عبور جدید</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="repassword" type="password" v-model="repassword" placeholder="تایید رمز عبور جدید" /> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-12"></div>
                    <div class="col-md-9 col-sm-9 col-xs-12" style="padding-right:0px;">
                        <span class="password_error" v-show="ShowError">
                            {{text}}
                        </span>
                        <button type="submit" class="btn save">ذخیــره اطلاعات</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo'
import Profile from './Profile'

export default {
    name:'setting',
    data() {
        return {
            ShowLoader:true,
            id:'',
            password:'',
            repassword:'',
            ShowError:false,
            oldpassword:'',
            text:''
        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile
    },
    created() {
        return this.GetData(),
        document.title = "تنظیمات";
    },
    methods : {
        GetData : function(){
            this.ShowLoader = true;
            this.$http.get('http://panel.tarhoasargroup.com/api/getwidget/setting',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res) {
                console.log(res.data);
                if(res.data[0].data !== null){
                    this.setting = JSON.parse(res.data[0].data);
                }
                this.id = res.data[0].id;
                this.ShowLoader = false;
            },function(err){
                console.log(err);
                this.ShowLoader = false;
            });
        },
         Save(){
            this.ShowError = false;
            this.text = "";
            if(this.oldpassword == "" || this.oldpassword == null){
                this.ShowError = true;
                this.text = "رمز عبور فعلی خود را وارد کنید.";
            }
            else if(this.password !== this.repassword){
                this.ShowError = true;
                this.text = "رمز عبور جدید با تکرار آن همخوانی ندارد، مجددا تلاش کنید.";
            }else{
                console.log(this.setting);
                this.ShowLoader = true;
                this.$http.post('http://panel.tarhoasargroup.com/api/changepassword',{
                    old:this.oldpassword,
                    new:this.password
                },{
                    headers: {
                    'Authorization':localStorage.getItem('Authorization') 
                    }
                })
                .then(function(res){
                    if(res.status == 200){
                        this.ShowLoader = false;
                    }
                    console.log(res.data);
                },function(err){
                    console.log(err);
                    this.ShowLoader = true;
                    if(err.status == 400){
                        this.ShowError = true;
                        this.text = "رمز عبور فعلی خود را اشتباه وارد کرده اید.";
                    }
                });
            }
            
        }
    }
}
</script>

<style>
.setting_list .content_holder{
    position: absolute;
    left: 80px;
    top: 100px;
    right: 40px;
    bottom: 80px;
    padding: 0;
    z-index: 99;
}
.setting_list form{
    float: right;
    width: 100%;
}
.setting_list .form_title{
    text-align: right;
    font-family: "IRANSANS BOLD";
    padding-bottom: 10px;
    font-size: 1.5em;
}
.setting_list .form_desc{
    text-align: right;
    padding-bottom: 10px;
    font-size: 1em;
    direction: rtl;
    margin-bottom: 25px;
}
.setting_list form label{
    float: right;
    margin-bottom: 15px;
    text-align: right;
}
.setting_list form .form-group{
    padding-bottom:15px;
}
.setting_list form .form-control{
    text-align: right;
    outline: none;
    box-shadow: none;
    background-color: #f5f5f5;
    border: 2px solid #cccccc;
    direction: rtl;
    padding: 10px 12px;
    height: 44px;
    border-radius: 6px;
}
.setting_list form textarea.form-control{
    height: 150px;
    text-align: left;
    direction: ltr;
    border-radius: 6px;
    resize: vertical;
    padding: 20px;
}
.setting_list .save{
    background: #f1f102;
    color: #000;
    box-shadow: none;
    outline: none;
    padding: 7px;
    font-size: 15px;
    float: right;
    clear: both;
    margin-bottom: 50px;
    margin-right: 0;
    width: 170px;
    font-family: 'IRANSANS BOLD';
    box-shadow: 0px 5px 0px #d7d710;
    transition: all .2s ease-in;
}
.setting_list .save:hover{
    box-shadow: 0px 3px 0px #d7d710;
    transition: all .2s ease-in;
}
.loader{
    position: fixed;
    z-index: 9999;
}
.password_error{
    background-color: #e74c3c;
    padding: 10px;
    text-align: center;
    color: #fff;
    direction: rtl;
    border-radius: 4px;
    float: right;
    clear: both;
    font-size: 13px;
    margin-bottom: 15px;
}
</style>