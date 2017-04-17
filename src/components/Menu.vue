<template>
    <div id="menu">
        <nav>
            <div class="nav_header">
                <svg v-on:click="NavigationStatus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="menu_icon" x="0px" y="0px" viewBox="0 0 396.667 396.667" style="enable-background:new 0 0 396.667 396.667;" xml:space="preserve">
                    <path d="M17,87.833h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17C0,80.183,7.65,87.833,17,87.833z" style="fill: rgb(255, 255, 255);"></path>
                    <path d="M17,215.333h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17S7.65,215.333,17,215.333z" style="fill: rgb(255, 255, 255);"></path>
                    <path d="M17,342.833h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17S7.65,342.833,17,342.833z" style="fill: rgb(255, 255, 255);"></path>
                </svg>
                <h2 class="menu_title">ویرایـش سایـت</h2>
            </div>
            <ul class="nav_list" v-bind:class="{ show: ShowMenu }">
                <li v-for="item in Item">
                    <a href="#">
                        {{item.name}}
                    </a>
                    <ul class="child_menu" v-if="item.child.length > 0">
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
</template>

<script>
export default {
    name:'menu',
    data () {
        return {
            ShowMenu : false,
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
    methods: {
        NavigationStatus : function (){
            this.ShowMenu = !this.ShowMenu;
        }
    }
}
</script>

<style>
#menu{
    position: fixed;
    top: 50px;
    right: 50px;
    width: auto;
}
#menu nav{
    display: block;
    background-color: #333333;
    border-radius: 4px;
}
#menu nav .nav_header{
    padding: 15px;
    direction: rtl;
    background-color: #222;
    border-radius: 4px;
}
#menu .menu_title{
    color: #fff;
    font-size: 1.5em;
    font-family: 'IRANSANS BOLD';
    margin-right: 45px;
    margin-top: 0;
    margin-bottom: 0;
}
#menu .menu_icon{
    float: right;
    height: 25px;
    width: 25px;
    cursor: pointer;
}
#menu .menu_icon path,
#menu .menu_icon line{
    stroke: #DDDCD7;
    stroke-width: 7px;
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

}
#menu .nav_list.show{
    max-height: 1000px;
    opacity: 1;
    -webkit-transition: all .6s ease;
    -moz-transition: all .6s ease;
    -o-transition: all .6s ease;
    -ms-transition: all .6s ease;
    transition: all .6s ease;
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
/*#menu .nav_list li:hover{
    background-color: #666;
    -webkit-transition: background-color .3s ease;
    -moz-transition: background-color .3s ease;
    -o-transition: background-color .3s ease;
    -ms-transition: background-color .3s ease;
    transition: background-color .3s ease;
}*/
#menu .nav_list li a{
    color: #cccccc;
    font-size: 16px;
    text-align: right;
    display: block;
    padding: 15px;
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
    background-color: #666;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}
#menu .nav_list li a:last-child{
    border-radius:0 0 4px 4px;
}
#menu .nav_list .child_menu{
    padding: 0 15px;
    position: relative;
    list-style: none;
    background-color: transparent;
    -webkit-transition: background-color .25s ease;
    -moz-transition: background-color .25s ease;
    -o-transition: background-color .25s ease;
    -ms-transition: background-color .25s ease;
    transition: background-color .25s ease;
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
#menu .nav_list .child_menu:hover{
    background-color: #666;
    -webkit-transition: background-color .25s ease;
    -moz-transition: background-color .25s ease;
    -o-transition: background-color .25s ease;
    -ms-transition: background-color .25s ease;
    transition: background-color .25s ease;
}
#menu .nav_list .child_menu li a:hover{
    background-color: transparent;
}
</style>