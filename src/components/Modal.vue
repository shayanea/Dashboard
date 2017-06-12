<template>
    <div id="Modal" v-show="show">
        {{show}}
        <div class="backdrop">
            <div class="custom_modal">
                <div class="header">
                    <h2>{{message}}</h2>
                </div>
                <div class="bottom">
                    <a class="modal_btn agree_btn col-md-6" @click="Agree">
                        بلی
                    </a>
                    <a class="modal_btn close_btn col-md-6" @click="Close">
                        خیر
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'modal',
    props:{
        show:{
            required:true,
            default:false            
        },
        message:{
            required:true,
            default:''
        }
    },
    data() {
        return {
        }
    },
    methods: {
        Close: function (){
            this.show = false;
            this.$emit('agree',false);
        },
        Agree: function (){
            this.show = false;
            this.$emit('agree',true);
        }
    }
}
</script>

<style>
#Modal{
    position:relative;
}
#Modal .backdrop{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999999;
} 
#Modal .custom_modal{
    position: absolute;
    left: 50%;
    top: 50%;
    background: #fff;
    z-index: 9999999;
    border-radius: 6px;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
#Modal .custom_modal h2{
    color: #222;
    font-size: 16px;
    direction: rtl;
    padding: 20px;
}
#Modal .custom_modal .bottom{
    /*border-top: 1px solid #ddd;*/
}
#Modal .custom_modal .modal_btn{
    padding: 10px;
    color: #222;
    text-align: center;
    text-decoration: none!important;
    cursor: pointer;
}
#Modal .custom_modal .close_btn{
    background: #eee;
    padding-left: 0; 
    border-radius: 0 0 0 6px;
}
#Modal .custom_modal .agree_btn{
    background: #55c9b2;
    color: #fff;
    border-radius: 0 0 6px 0;
}
</style>
