<template>
    <click-outside :handler="handleClickOutside">
        <div id="menu">
            <nav>
                <div class="nav_header">
                    <svg version="1.1" v-on:click="NavigationStatus" class="menu_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 183.2 139.2" style="enable-background:new 0 0 183.2 139.2;" xml:space="preserve">
                        <path d="M7,17.4h169.1c4.2,0,7-3.5,7-8.7s-2.8-8.7-7-8.7H7C2.8,0,0,3.5,0,8.7S2.8,17.4,7,17.4z"/>
                        <path d="M178.3,60.9H60.7c-2.9,0-4.9,3.5-4.9,8.7s1.9,8.7,4.9,8.7h117.5c2.9,0,4.9-3.5,4.9-8.7S181.3,60.9,178.3,60.9z"/>
                        <path d="M177.2,121.8H32.7c-3.6,0-6,3.5-6,8.7s2.4,8.7,6,8.7h144.5c3.6,0,6-3.5,6-8.7C183.2,125.3,180.8,121.8,177.2,121.8z"/>
                    </svg>

                    <h2 class="menu_title">ویرایـش سایـت</h2>
                </div>
                <ul class="nav_list" v-bind:class="{ show: ShowMenu }">
                    <li v-for="item in Item" v-on:click="ShowDropDown(item)">
                        <a href="#">
                            {{item.name}}
                        </a>
                        <svg v-if="item.child.length > 0" class="arrow_dropdown" v-bind:class="{ rotate : DropDown}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;" xml:space="preserve">
                            <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" 
                            style="fill: rgb(204, 204, 204);"></path>
                        </svg>
                        <ul class="child_menu" v-if="item.child.length > 0" v-bind:class="{ show_dropdown : DropDown}">
                            <li v-for="child in item.child">
                                <a href="#">
                                    {{child.name}}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>  
        </div>
    </click-outside>
</template>

<script>
import ClickOutside from 'onclick-outside'

export default {
    name:'menu',
    data () {
        return {
            ShowMenu : false,
            DropDown : false,
            Item : [
                {
                    name: 'درباره‌ مـا',
                    sort: 0,
                    child:[]
                },
                {
                    name: 'نمونه کــار‌هـا',
                    sort: 1,
                    child:[
                        {
                            name: 'لیست نمونه کار‌ها',
                            sort: 0
                        },
                        {
                            name: 'اضافه کردن نمونه کار',
                            sort: 1
                        }
                    ]
                },
                {
                    name: 'وبلاگ و اخبـار',
                    sort: 2,
                    child:[]
                },
                {
                    name: 'ارتباط بـا مـا',
                    sort: 3,
                    child:[]
                },
                {
                    name: 'تنظیمات',
                    sort: 4,
                    child:[]
                },
                {
                    name: 'آمــار بازدید',
                    sort: 5,
                    child:[]
                }
            ]
        }
    },
    components: {
        ClickOutside
    },
    methods: {
        NavigationStatus : function (){
            this.ShowMenu = !this.ShowMenu;
        },
        ShowDropDown : function (item){
            if(item.child.length > 0){
                this.DropDown = !this.DropDown;
            }
        },
        handleClickOutside : function(e) {
            this.ShowMenu = false;
        }
    }
}
</script>

<style>
#menu{
    position: fixed;
    top: 40px;
    right: 40px;
    width: auto;
    z-index: 9;
    z-index: 999;
}
#menu nav{
    display: block;
    background-color: #3a3a3a;
    border-radius: 6px;
}
#menu nav .nav_header{
    padding: 15px;
    direction: rtl;
    background-color: #363636;
    border-radius: 6px;
}
#menu .menu_title{
    color: #fff;
    font-size: 1em;
    font-family: 'IRANSANS BOLD';
    margin-right: 35px;
    margin-top: 0;
    margin-bottom: 0;
}
#menu .menu_icon{
    float: right;
    height: 25px;
    width: 22px;
    cursor: pointer;
    margin-top: -5px;
}
#menu .menu_icon path,
#menu .menu_icon line{
    stroke: #fff;
    stroke-width: 7px;
    fill: #fff;
}
#menu .nav_list{
    display: block;
    list-style: none;
    padding-left: 0;
    max-height: 0;
    opacity: 0;
    -webkit-transition: all .6s ease;
    -moz-transition: all .6s ease;
    -o-transition: all .6s ease;
    -ms-transition: all .6s ease;
    transition: all .6s ease;
    overflow: hidden;
}
#menu .nav_list.show{
    max-height: 1000px;
    opacity: 1;
    -webkit-transition: all .6s ease;
    -moz-transition: all .6s ease;
    -o-transition: all .6s ease;
    -ms-transition: all .6s ease;
    transition: all .6s ease;
    padding-bottom: 10px;
    overflow: visible;
}
#menu .nav_list li{
    background-color: transparent;
    position: relative;
    -webkit-transition: background-color .3s ease;
    -moz-transition: background-color .3s ease;
    -o-transition: background-color .3s ease;
    -ms-transition: background-color .3s ease;
    transition: background-color .3s ease;
}
#menu .nav_list li a{
    color: #cccccc;
    font-size: 13px;
    text-align: right;
    display: block;
    padding: 10px;
    padding-right: 15px;
    text-decoration: none;
    background-color: transparent;
    font-family: 'IRANSANS BOLD';
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
#menu .nav_list li a:hover{
    color: #ffff00;
    background-color: #404040;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
#menu .nav_list li a:last-child{
    border-radius:0 0 6px 6px;
}
#menu .nav_list .arrow_dropdown{
    height: 10px;
    width: 10px;
    position: absolute;
    left: 15px;
    top: 15px;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
}
#menu .nav_list .arrow_dropdown.rotate{
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
#menu .nav_list .child_menu{
    padding: 0 15px;
    position: relative;
    list-style: none;
    background-color: #404040;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
    max-height: 0;
    min-height: 0;
    opacity: 0;
}
#menu .nav_list .child_menu:before{
    content: '';
    position: absolute;
    right: 15px;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #ffff00;
    z-index: 999;
}
#menu .nav_list .child_menu.show_dropdown{
    min-height: 75px;
    opacity: 1;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
#menu .nav_list .child_menu li a:hover{
    background-color: transparent;
}
</style>