<template>
    <div class="project_list">
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
        <div class="content_holder container-fluid">
            <div class="row">
                <div class="col-md-3 col-sm-3 col-xs-12"></div>
                <div class="col-md-9 col-sm-9 col-xs-12">
                    <h4 class="form_title">
                        لیست پروژه ها
                    </h4>
                    <p class="form_desc">
                        در این لیست شما می توانید پروژه های درج شده خود را حذف و تدوین نمایید.
                    </p>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-3 col-sm-3 col-xs-12"></div>
                <div class="col-md-9 col-sm-9 col-xs-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>نام پروژه</th>
                                    <th>زمان درج</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in list">
                                    <td>
                                        {{item.data.title}}
                                    </td>
                                    <td>
                                        {{item.data.date}}
                                    </td>
                                    <td>
                                        <button @click="RemoveProject(index,item)" class="remove_project">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;" xml:space="preserve" width="512px" height="512px">
                                                <g>
                                                    <path d="M29.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C28.5,50.553,28.948,51,29.5,51z" fill="#FFFFFF"/>
                                                    <path d="M19.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C18.5,50.553,18.948,51,19.5,51z" fill="#FFFFFF"/>
                                                    <path d="M39.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C38.5,50.553,38.948,51,39.5,51z" fill="#FFFFFF"/>
                                                    <path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289   C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h2.041l1.915,46.021C10.493,55.743,11.565,59,15.364,59   h28.272c3.799,0,4.871-3.257,4.907-4.958L50.459,8H52.5c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681   C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553   C20.665,4.952,20.988,3.504,21.792,2.681z M46.544,53.979C46.538,54.288,46.4,57,43.636,57H15.364   c-2.734,0-2.898-2.717-2.909-3.042L10.542,8h37.915L46.544,53.979z" fill="#FFFFFF"/>
                                                </g>
                                            </svg>
                                        </button>
                                        <button @click="EditProject(item.id)" class="edit_project">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;" xml:space="preserve">
                                                <g>
                                                    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z" fill="#FFFFFF"/>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <modal :show="ShowModal" message="آیا تمایل به حذف این پروژه دارید ؟" @agree="Remove"></modal>
    </div>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo'
import Profile from './Profile'
import Modal from './Modal'

export default {
    name:'project',
    data() {
        return {
            ShowLoader:false,
            list:[],
            ShowModal:false,
            index:'',
            item:''
        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile,
        'modal': Modal
    },
    created(){
        return this.GetData(),
        document.title = "لیست پروژه ها";
    },
    methods : {
        GetData : function(){
            this.ShowLoader = true;
            this.$http.get('http://panel.hex.team/api/getwidget/project',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res) {
                console.log(res.data);
                for(var i = 0;res.data.length > i; i++){
                    this.list.push({data:JSON.parse(res.data[i].data),id:res.data[i].id});
                    console.log(this.list[i]);
                }
                this.ShowLoader = false;
            },function(err){
                console.log(err);
                this.ShowLoader = false;
            });
        },
        RemoveProject(index,item){
            this.index = index;
            this.item = item;
            this.ShowModal = true;
        },
        Remove(status){
            if(status){
                this.ShowModal = false;
                this.ShowLoader = true;
                this.$http.get('http://panel.hex.team/api/removewidget/'+this.item.id,{
                    headers: {
                    'Authorization':localStorage.getItem('Authorization') 
                    }
                })
                .then(function(res){
                    if(res.status == 200){
                        this.list.splice(this.index,1);
                        this.ShowLoader = false;
                    }
                },function(err){
                    console.log(err);
                });
            }else{
                this.ShowModal = false;
            }
        },
        EditProject(id){
            console.log(id);
            this.$router.push({ name: 'EditProject', params: { id: id }})
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
.project_list .form_title{
    text-align: right;
    font-family: "IRANSANS BOLD";
    padding-bottom: 10px;
    font-size: 1.5em;
}
.project_list .form_desc{
    text-align: right;
    padding-bottom: 10px;
    font-size: 1em;
    direction: rtl;
    margin-bottom: 25px;
}
.table{
    table-layout: fixed;
    direction: rtl;
}
.table>thead>tr>th,
.table>tbody>tr>td{
    text-align: center;
    vertical-align: middle
}
.table .remove_project,
.table .edit_project{
    margin-top: -5px;
}
.remove_project,
.edit_project{
    display: inline-block;
    background: #71e0ca;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 7px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    font-weight: bold;
    box-shadow: 0px 5px 0px #55c9b2;
    transition: all .2s ease-in;
}
.project_list .remove_project,
.project_list .edit_project{
    box-shadow: none;
    border-radius: 0;
    height: 40px;
    margin-top: -10px;
    margin-bottom: -10px;
    width: 50px;
    text-align: center;
    background: transparent;
}
.project_list .remove_project svg,
.project_list .edit_project svg{
    height: 15px;
    width:15px;
    stroke: #222;
    stroke-width: 2px;
    fill: #222;
}
.project_list .remove_project svg path,
.project_list .edit_project svg path{
    fill: #222;
}
.project_list .remove_project:hover,
.project_list .edit_project:hover{
    box-shadow: none;
    background: transparent;
}
.remove_project{
    background: #D91E18;
    box-shadow: 0px 5px 0px #C0392B;
}
.project_list .remove_project{
    margin-left: -8px;
}
.remove_project:hover{
    box-shadow: 0px 2px 0px #C0392B;
    transition: all .2s ease-in;
}
.edit_project:hover{
    box-shadow: 0px 2px 0px #55c9b2;
    transition: all .2s ease-in;
    text-decoration: none;
}
.loader{
    position: fixed;
    z-index: 9999;
}
</style>