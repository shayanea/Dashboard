<template>
    <div class="contact_list">
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
                        تدوین ارتباط با ما
                    </h4>
                    <p class="form_desc">
                        با استفاده از این فرم شما می توانید اطلاعات ارتباط با ما خود را وارد کنید.
                    </p>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">عنوان</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="title" v-model="contact.title" maxlength="58" placeholder="عنوان" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">توضیح کوتاه</label>
                        <textarea class="form-control col-md-9 col-sm-9 col-xs-12" v-model="contact.description" spellcheck="false"></textarea>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">شماره تماس</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="tel" v-model="contact.tel" placeholder="شماره تماس" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="address" v-model="contact.address" placeholder="آدرس" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">پست الکترونیکی</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="email" v-model="contact.email" placeholder="پست الکترونیکی" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس نقشه</label>
                        <!--<input v-model="vm.searchPlace" 
                        v-gmaps-searchbox:location="vm" placeholder="آدرس نقشه" />-->
                        <gmap-place-input :default-place="contact.place" class="form-control col-md-9 col-sm-9 col-xs-12" 
                            @place_changed="setPlace">
                        </gmap-place-input>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <div class="col-md-3 col-sm-3 col-xs-12"></div>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                            <gmap-map
                            :center="contact.center"
                            :zoom="16"
                            style="margin-left: -10px;margin-right: -10px;height: 300px">
                                <gmap-marker
                                :key="index"
                                v-for="(m, index) in contact.markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @position_changed="updateChild(m, 'position', $event)"
                                @click="contact.center=m.position"
                                ></gmap-marker>
                            </gmap-map>
                        </div>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس شبکه اجتماعی facebook</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="url" v-model="contact.facebook" placeholder="آدرس شبکه اجتماعی facebook" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس شبکه اجتماعی twitter</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="url" v-model="contact.twitter" placeholder="آدرس شبکه اجتماعی twitter" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس شبکه اجتماعی linkedin</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="url" v-model="contact.linkedin" placeholder="آدرس شبکه اجتماعی linkedin" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">آدرس شبکه اجتماعی instagram</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="url" v-model="contact.instagram" placeholder="آدرس شبکه اجتماعی instagram" /> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-12"></div>
                    <div class="col-md-9 col-sm-9 col-xs-12" style="padding-right:0px;">
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
    name:'project',
    data() {
        return {
            ShowLoader:false,
            id:'',
            contact:{
                title:'',
                description:'',
                tel:'',
                email:'',
                address:'',
                facebook:'',
                twitter:'',
                instagram:'',
                linkedin:'',
                place: 'Tehran',
                center: {lat: 35.6892, lng: 51.3890},
                markers: [{position: {lat: 35.6892, lng: 51.3890}}]
            }
        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile
    },
    created(){
        return this.GetData(),
        document.title = "لیست پروژه ها";
    },
    methods : {
        setPlace(place) {
            this.contact.center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            this.contact.markers[0].position = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            this.contact.place = place.formatted_address
        },
        updateChild(object, field, event) {
            if (field === 'position') {
                this.contact.markers[0].position = {
                    lat: event.lat(),
                    lng: event.lng(),
                };
            }
        },
        GetData : function(){
            this.ShowLoader = true;
            this.$http.get('http://panel.tarhoasargroup.com/api/getwidget/contactus',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res) {
                console.log(res.data);
                if(res.data[0].data !== null){
                    this.contact = JSON.parse(res.data[0].data);
                    console.log(this.contact.place)
                    //  var item = JSON.parse(res.data[0].data);
                    //  this.contact.title = item.title;
                    //  this.contact.description = item.description;
                    //  this.contact.tel = item.tel;
                    //  this.contact.email = item.email;
                    //  this.contact.address = item.address;
                    //  this.contact.facebook = item.facebook;
                    //  this.contact.twitter = item.twitter;
                    //  this.contact.instagram = item.instagram;
                    //  this.contact.linkedin = item.linkedin;
                }
                this.id = res.data[0].id;
                this.ShowLoader = false;
            },function(err){
                console.log(err);
                this.ShowLoader = false;
            });
        },
        Save(){
            console.log(this.contact.markers)
            this.ShowLoader = true;
            this.$http.post('http://panel.tarhoasargroup.com/api/setwidget',{
                id:this.id,
                data:JSON.stringify(this.contact)
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
            });
        }
    }
}
</script>

<style>
.contact_list .content_holder{
    position: absolute;
    left: 80px;
    top: 100px;
    right: 40px;
    bottom: 80px;
    padding: 0;
    z-index: 99;
}
.contact_list form{
    float: right;
    width: 100%;
}
.contact_list .form_title{
    text-align: right;
    font-family: "IRANSANS BOLD";
    padding-bottom: 10px;
    font-size: 1.5em;
}
.contact_list .form_desc{
    text-align: right;
    padding-bottom: 10px;
    font-size: 1em;
    direction: rtl;
    margin-bottom: 25px;
}
.contact_list form label{
    float: right;
    margin-bottom: 15px;
    text-align: right;
}
.contact_list form .form-group{
    padding-bottom:15px;
}
.contact_list form .form-control{
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
.contact_list form .form-control input{
    border: 0;
    background: transparent;
    width: 100%;
    outline: none;
}
.contact_list form textarea.form-control{
    height: 150px;
    text-align: left;
    direction: ltr;
    border-radius: 6px;
    resize: vertical;
    padding: 20px;
}
.contact_list .save{
    background: #f1f102;
    color: #616161;
    box-shadow: none;
    outline: none;
    padding: 7px;
    font-size: 15px;
    margin-bottom: 50px;
    margin-right: 15px;
    width: 170px;
    font-family: 'IRANSANS BOLD';
    box-shadow: 0px 5px 0px #d7d710;
    transition: all .2s ease-in;
}
.contact_list .save:hover{
    box-shadow: 0px 3px 0px #d7d710;
    transition: all .2s ease-in;
}
.loader{
    position: fixed;
    z-index: 9999;
}
</style>