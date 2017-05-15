<template>
    <div class="project_list">
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
        <div class="content_holder"></div>
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

        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile
    },
    created(){
        return document.title = "لیست پروژه ها";
    },
    methods : {
        GetData : function(){
            this.$http.get('http://panel.hex.team/api/getwidget?widget=project',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res) {
                console.log(res.data);
            },function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style>
.project_list .content_holder{
    position: absolute;
    left: 80px;
    top: 100px;
    right: 40px;
    bottom: 80px;
    padding: 0;
    z-index: 99;
}
</style>