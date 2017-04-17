<template>
    <div class="profile">
        <div class="profile_icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"x="0px" y="0px" viewBox="0 0 258.75 258.75" style="enable-background:new 0 0 258.75 258.75;" xml:space="preserve">
                <circle cx="129.375" cy="60" r="60"></circle>
                <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"></path>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile',
    data () {
        return {
            FirstName : 'شایان',
            LastName : 'عراقی',
            Image : ''
        }
    },
    methods : {
        LogOut : function (){

        }
    }
}
</script>

<style>
.profile{
    position: fixed;
    left: 50px;
    top: 50px;
    height: 55px;
}
.profile .profile_icon{
    margin-top: 15px;
}
.profile .profile_icon svg{
    width: 20px;
    height: 20px;
}
.profile .profile_icon svg path,
.profile .profile_icon svg circle{
    fill: #333333;
}
</style>