<template>
    <div class="dashboard">
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
    </div>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo'
import Profile from './Profile'

export default {
    name:'dashboard',
    data (){
        return {

        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile
    }
}
</script>

<style>

</style>