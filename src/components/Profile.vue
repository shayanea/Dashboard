<template>
    <click-outside :handler="handleClickOutside">
        <div class="profile" v-on:click="ShowProfile" v-bind:class="{ ShowBtn : ShowLogOut}">
            <div class="profile_icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"x="0px" y="0px" viewBox="0 0 258.75 258.75" style="enable-background:new 0 0 258.75 258.75;" xml:space="preserve">
                    <circle cx="129.375" cy="60" r="60"></circle>
                    <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"></path>
                </svg>
            </div>
            <span class="logout">خـروج</span>
        </div>
    </click-outside>
</template>

<script>
import ClickOutside from 'onclick-outside'

export default {
    name: 'profile',
    data () {
        return {
            ShowLogOut: false
        }
    },
    components: {
        ClickOutside
    },
    methods : {
        LogOut : function (){

        },
        ShowProfile : function (){
            this.ShowLogOut = !this.ShowLogOut;
        },
        handleClickOutside : function(e) {
            this.ShowLogOut = false;
        }
    }
}
</script>

<style>
.profile{
    position: fixed;
    left: 40px;
    top: 40px;
    height: 45px;
    -webkit-transition: all .4s ease;
    -moz-transition: all .4s ease;
    -o-transition: all .4s ease;
    -ms-transition: all .4s ease;
    transition: all .4s ease;
    border-radius: 6px;
    cursor: pointer;
}
.profile .profile_icon{
    margin-top: 13px;
    display: inline-block;
}
.profile .profile_icon svg{
    width: 18px;
    height: 18px;
}
.profile .profile_icon svg path,
.profile .profile_icon svg circle{
    fill: #333333;
}
.profile .logout{
    color: #fff;
    font-size: 12px;
    font-family: "IRANSANS BOLD";
    opacity: 0;
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
    -o-transition: all .1s ease;
    -ms-transition: all .1s ease;
    transition: all .1s ease;
    position: absolute;
    top: 15px;
}
.ShowBtn{
    width: 100px!important;
    background-color: #363636!important;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
    padding-left: 15px;
}
.ShowBtn .profile_icon svg path,
.ShowBtn .profile_icon svg circle{
    fill: #fff;
}
.ShowBtn .logout{
    opacity: 1;
    right: 15px;
    -webkit-transition: opacity .3s ease;
    -moz-transition: opacity .3s ease;
    -o-transition: opacity .3s ease;
    -ms-transition: opacity .3s ease;
    transition: opacity .3s ease;
}
</style>