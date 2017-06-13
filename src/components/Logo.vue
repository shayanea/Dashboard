<template>
    <div id="BottomLogo">
        <svg v-on:click="GoToSite" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 1258.8 505.1" style="enable-background:new 0 0 1258.8 505.1;" xml:space="preserve">
            <path class="baracket1" d="M91.6,57.7v159.5c0,2.4-0.1,4.6-0.4,6.5c-0.2,1.9-0.6,4.1-1.1,6.5c-6.7,8.7-16.4,15.2-28.9,19.5c12,3.4,21.6,9.4,28.9,18
            c0.5,2.4,0.8,4.8,1.1,7.2c0.2,2.4,0.4,4.8,0.4,7.2v166c0,4.3,2.2,6.5,6.5,6.5h44v50.5H91.6h0.7c-14.4-1.4-26.6-7.6-36.4-18.4
            c-9.9-10.8-14.8-23.7-14.8-38.6v-166c0-4.8-2.4-7.2-7.2-7.2H0v-50.5h33.9c4.8,0,7.2-2.4,7.2-7.2V57.7c0-15.9,5.5-29.5,16.6-40.8
            C68.8,5.7,82.3,0,98.1,0h44v50.5h-44C93.8,50.5,91.6,52.9,91.6,57.7z"/>
            <path class="paragraph" d="M393.9,0v505.1h-50.5V252.5H243.1v252.5h-50.5V0h50.5v202h100.3V0H393.9z"/>
            <path class="paragraph" d="M491.3,50.5v150.8h105.3v50.5H491.3v202.7h131.3v50.5H440.8V201.3h50.5L440.8,0h181.8v50.5H491.3z"/>
            <path class="paragraph" d="M826.8,228.7l76.5,276.3h-53.4l-62.8-239.5l-62.8,239.5h-54.1l76.5-276.3L669.6,0h55.6l62.1,194.8L848.5,0h55.6L826.8,228.7
            z"/>
            <path class="baracket2" d="M997.8,447.3V287.9c0-2.4,0.1-4.6,0.4-6.5c0.2-1.9,0.6-4.1,1.1-6.5c6.7-8.7,16.3-15.2,28.9-19.5c-12-3.4-21.6-9.4-28.9-18
            c-0.5-2.4-0.8-4.8-1.1-7.2c-0.2-2.4-0.4-4.8-0.4-7.2V57c0-4.3-2.2-6.5-6.5-6.5h-44V0h50.5h-0.7c14.4,1.4,26.6,7.6,36.4,18.4
            c9.9,10.8,14.8,23.7,14.8,38.6v166c0,4.8,2.4,7.2,7.2,7.2h33.9v50.5h-33.9c-4.8,0-7.2,2.4-7.2,7.2v159.5c0,15.9-5.5,29.5-16.6,40.8
            c-11.1,11.3-24.5,17-40.4,17h-44v-50.5h44C995.7,454.6,997.8,452.2,997.8,447.3z"/>
            <circle class="circle" cx="1205.4" cy="451.7" r="53.3" style="fill:rgb(234, 198, 27);"/>
        </svg>
    </div>
</template>

<script>
export default {
    name:'logo',
    data () {
        return {

        }
    },
    methods : {
        GoToSite : function () {
            window.open('http://tarhoasargroup.com/','_blank');
        }
    }
}
</script>

<style>
#BottomLogo{
    position: fixed;
    left: 40px;
    bottom: 40px;
    cursor: pointer;
}
#BottomLogo svg{
    width: 70px;
    opacity: .4;
}
#BottomLogo .paragraph{
    opacity: 0;
}
#BottomLogo:hover .paragraph{
    opacity: 1;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
}
#BottomLogo:hover .paragraph:nth-child(2){
    -webkit-transition-delay: .20s;
    -moz-transition-delay: .20s;
    -o-transition-delay: .20s;
    transition-delay: .20s;   
}
#BottomLogo:hover .paragraph:nth-child(3){
    -webkit-transition-delay: .23s;
    -moz-transition-delay: .23s;
    -o-transition-delay: .23s;
    transition-delay: .23s;
}
#BottomLogo:hover .paragraph:nth-child(4){
    -webkit-transition-delay: .26s;
    -moz-transition-delay: .26s;
    -o-transition-delay: .26s;
    transition-delay: .26s;    
}
#BottomLogo .baracket2{
    -webkit-transform: translate(-600px, 0%);
    -o-transform: translate(-600px, 0%);
    -moz-transform: translate(-600px, 0%);
    transform: translate(-600px, 0%);
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
}
#BottomLogo:hover .baracket2{
    -webkit-transform: translate(0%, 0%);
    -o-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);
    transform: translate(0%, 0%);
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
    -webkit-transition-delay: .1s;
    -moz-transition-delay: .1s;
    -o-transition-delay: .1s;
    transition-delay: .1s;
}
#BottomLogo .circle{
    -webkit-transform: translate(-960px, -202px);
    -o-transform: translate(-960px, -202px);
    -moz-transform: translate(-960px, -202px);
    transform: translate(-960px, -202px);
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
}
#BottomLogo:hover .circle{
    -webkit-transform: translate(0%, 0%);
    -o-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);
    transform: translate(0%, 0%);
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -o-transition: all .2s ease;
    -ms-transition: all .2s ease;
    transition: all .2s ease;
}
</style>