<template>
    <div id="LoginError" v-show="status">
        {{text}}
    </div>
</template>

<script>
export default {
    name:'Error',
    props:{
        status:{
            type:Boolean,
            required:true
        },
        text:{
            type:String,
            required:true
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style>
    #LoginError{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e74c3c;
        padding: 15px;
        text-align: center;
        color: #fff;
        direction: rtl;
        -webkit-animation: ShowFromBottom .3s forwards;
        -moz-animation: ShowFromBottom .3s forwards;
        -o-animation: ShowFromBottom .3s forwards;
        animation: ShowFromBottom .3s forwards;
    }

    @keyframes ShowFromBottom {
        0% {
            -o-transform: translate(0%, 100%);
            -moz-transform: translate(0%, 100%);
            -webkit-transform: translate(0%, 100%);
            transform: translate(0%, 100%);
        }
        100% {
            -o-transform: translate(0%, 0%);
            -moz-transform: translate(0%, 0%);
            -webkit-transform: translate(0%, 0%);
            transform: translate(0%, 0%);
        }
    }
</style>