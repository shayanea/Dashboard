<template>
    <div class="about">
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
            <form @submit.prevent="Save">
                <div class="col-md-3 col-sm-3 col-xs-12"></div>
                <div class="col-md-9 col-sm-9 col-xs-12">
                    <h4 class="form_title">
                        تدوین اطلاعات دربـاره ما
                    </h4>
                    <p class="form_desc">
                        با استفاده از این فرم شما می توانید اطلاعات خود را ویرایش کنید.
                    </p>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">عنوان</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="title" v-model="about.title" maxlength="58" placeholder="عنوان" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">توصیحات</label> 
                        <!--<quill-editor class="col-md-9 col-sm-9 col-xs-12" v-model="about.description" :options="editorOption" 
                        @change="onEditorChange($event)" @ready="onEditorReady($event)">
                        </quill-editor>-->
                        <textarea class="form-control col-md-9 col-sm-9 col-xs-12" v-model="about.description" spellcheck="false"></textarea>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">تصویر اصلی</label>
                        <file-base64
                            :multiple="false"
                            :done="UploadGallery">
                        </file-base64>
                        <div class="progress gallery_progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-3 col-xs-12"></div>
                        <figure v-for="(item, index) in about.gallery">
                            <img :src="item.src" class="img-responsive thumbnail"/>
                            <span class="remove_img" @click="RemoveGallery(index)"></span>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12" v-for="(item, index) in about.teams">
                        <label class="col-md-3 col-sm-3 col-xs-12">{{index+1}} اعضای تیم</label>
                        <div class="form-group col-md-3 col-sm-3 col-xs-12 padding-right-none">
                            <input class="form-control" name="name" v-model="item.name" maxlength="58" placeholder="نام" />
                        </div>
                        <div class="form-group col-md-3 col-sm-3 col-xs-12 padding-right-none"> 
                            <input class="form-control" name="position" v-model="item.position" maxlength="58" placeholder="سمت" /> 
                        </div>
                        <file-base64
                            :multiple="false"
                            :done="UploadTeam"
                            :index="index">
                        </file-base64>
                        <a @click="RemovePerson(index)" class="remove_person"></a>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-3 col-xs-12"></div>
                        <figure :class="['uploader' + (index)]">
                            <img :src="item.src" class="img-responsive thumbnail"/>
                            <span class="remove_img" @click="RemoveTeamPic(index)"></span>
                        </figure>
                        <div :class="['progress progress' + (index)]" style="margin-right:0px">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-12"></div>
                    <div class="col-md-9 col-sm-9 col-xs-12" style="padding-right:0px;">
                        <a class="add_person" @click="AddNewPerson">عضو جدید</a>
                        <button type="submit" class="btn save">ذخیــره اطلاعات</button>
                    </div>
                </div>
            </form>
        </div>        
    </div>
</template>

<script>
import Menu from './Menu'
import Logo from './Logo'
import Profile from './Profile'
import fileBase64 from './uplaoder'

export default {
    name:'about',
    data (){
        return {
            ShowLoader:false,
            id:'',
            about:{
                title : '',
                description : '',
                header:'',
                gallery:[],
                teams:[]
                    
            },
            editorOption: {
                placeholder: 'توضیحات ...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold'],
                        [{ 'align': [] }],
                    ],
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    }
                }
            }
        }
    },
    components:{
        'navigation': Menu,
        'logo': Logo,
        'profile': Profile,
        fileBase64 
    },
    created(){
        return this.GetData(), 
        document.title = "تدوین صفحه درباره ما";
    },
    methods :{
        GetData(){
            this.ShowLoader = true;
            this.$http.get('http://panel.tarhoasargroup.com/api/getwidget/about',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res){
                console.log(res.data);
                if(res.data[0].data !== null){
                    this.about = JSON.parse(res.data[0].data);
                }
                this.id = res.data[0].id;
                this.ShowLoader = false;
            },function(err){
                console.log(err);
                this.ShowLoader = false;
            });
        },
        UploadGallery(file){
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.tarhoasargroup.com/api/upload', formData, {
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                },
                progress(e) {
                    if (e.lengthComputable) {
                        $('.gallery_progress').css('display','block');
                        $('.gallery_progress .progress-bar').css('width',parseInt((e.loaded / e.total ) * 100)+"%");
                    }
                }
            }).then(function (response){
                $('.gallery_progress').css('display','none');
                $('.gallery_progress .progress-bar').css('width',"0%");
                this.about.gallery.push({src: 'http://panel.tarhoasargroup.com/api/download/' + response.data.name});
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        RemoveGallery(index){
             this.about.gallery.splice(index,1);
        },
        AddNewPerson(){
            this.about.teams.push({'name':'','position':'','src':''});
        },
        UploadTeam(file){
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.tarhoasargroup.com/api/upload', formData, {
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                },
                progress(e) {
                    if (e.lengthComputable) {
                        
                        $('.progress'+file.index).css('display','block');
                        $('.progress'+file.index+' .progress-bar').css('width',parseInt((e.loaded / e.total ) * 100)+"%");
                    }
                }
            }).then(function (response){
                $('.progress'+file.index).css('display','none');
                $('.progress'+file.index+' .progress-bar').css('width',"0%");
                this.about.teams[file.index].src = 'http://panel.tarhoasargroup.com/api/download/' + response.data.name;
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        RemoveTeamPic(index){
            this.about.teams[index].src = "";
        },
        RemovePerson(index){
            this.about.teams.splice(index,1);
        },
        Save(){
            console.log(this.about);
            this.ShowLoader = true;
            this.$http.post('http://panel.tarhoasargroup.com/api/setwidget',{
                id:this.id,
                data:JSON.stringify(this.about)
            },{
                headers: {
                   'Authorization':localStorage.getItem('Authorization') 
                }
            })
            .then(function(res){
                if(res.status == 200){
                    this.ShowLoader = false;
                }
                console.log(res.data);
            },function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style>
.about .content_holder{
    position: absolute;
    left: 80px;
    top: 100px;
    right: 40px;
    bottom: 80px;
    padding: 0;
    z-index: 99;
}
.about form{
    float: right;
    width: 100%;
}
.about .form_title{
    text-align: right;
    font-family: "IRANSANS BOLD";
    padding-bottom: 10px;
    font-size: 1.5em;
}
.about .form_desc{
    text-align: right;
    padding-bottom: 10px;
    font-size: 1em;
    direction: rtl;
    margin-bottom: 25px;
}
.about form label{
    float: right;
    margin-bottom: 15px;
    text-align: right;
}
.about form .form-group{
    padding-bottom:15px;
}
.about form .form-control{
    text-align: right;
    outline: none;
    box-shadow: none;
    background-color: #f5f5f5;
    border: 2px solid #cccccc;
    direction: rtl;
    padding: 10px 12px;
    height: 44px;
    border-radius: 6px;
}
.about form textarea.form-control{
    height: 150px;
    padding:20px;
    text-align: left;
    direction: ltr;
    border-radius: 6px;
    resize: vertical;
    padding: 20px;
}
.quill-editor{
    padding: 0;
}
.ql-container{
    background-color: #f5f5f5;
    border-radius: 0 0 6px 6px;
}
.ql-editor.ql-blank::before{
    right: 10px;
}
.ql-toolbar.ql-snow{
    border-radius: 6px 6px 0 0;
    background-color: #f5f5f5;
    direction: rtl;
}
.ql-container .ql-editor {
    min-height: 10em;
    padding-bottom: 1em;
    max-height: 15em;
    font-family: "IRANSANS";
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg{
    left: 0;
    right: auto!important;
}
.about figure{
    margin: 0;
    padding: 0;
    position: relative;
    max-height: 150px;
    float: right;
    display: block;
    margin-left: 15px;
}
.about figure:hover .remove_img{
    opacity: 1;
    transition: all .2s ease-in;
}
.about .remove_img{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    text-align: center;
    background: rgba(255, 255, 255, 0.45);
    transition: all .2s ease-in;
}
.about .remove_img:after{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 35px;
    width: 60px;
    border-radius: 6px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fff;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ljk3MSA0Ny45NzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3Ljk3MSA0Ny45NzE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yOC4yMjgsMjMuOTg2TDQ3LjA5Miw1LjEyMmMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBMMjMuOTg2LDE5Ljc0NEw1LjEyMSwwLjg4ICAgYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBjLTEuMTcyLDEuMTcxLTEuMTcyLDMuMDcxLDAsNC4yNDJsMTguODY1LDE4Ljg2NEwwLjg3OSw0Mi44NWMtMS4xNzIsMS4xNzEtMS4xNzIsMy4wNzEsMCw0LjI0MiAgIEMxLjQ2NSw0Ny42NzcsMi4yMzMsNDcuOTcsMyw0Ny45N3MxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWwxOC44NjUtMTguODY0TDQyLjg1LDQ3LjA5MWMwLjU4NiwwLjU4NiwxLjM1NCwwLjg3OSwyLjEyMSwwLjg3OSAgIHMxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyTDI4LjIyOCwyMy45ODZ6IiBmaWxsPSIjZmY2NDY0Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)
}
.about .thumbnail{
    border-radius: 5px;
    border:0;
    height: auto;
    min-height: 100px;
    min-width: 170px;
    max-width: 170px;
    object-fit: cover;
    object-position: center;
    max-height: 100px;
    padding: 0;
    background: transparent;
    float: right;
    margin-bottom: 0;
}
.about .save{
    background: #f1f102;
    color: #616161;
    box-shadow: none;
    outline: none;
    padding: 7px;
    font-size: 15px;
    margin-bottom: 50px;
    margin-left: 15px;
    width: 170px;
    font-family: 'IRANSANS BOLD';
    box-shadow: 0px 5px 0px #d7d710;
    transition: all .2s ease-in;
}
.about .save:hover{
    box-shadow: 0px 3px 0px #d7d710;
    transition: all .2s ease-in;
}
.loader{
    position: fixed;
    z-index: 9999;
}
.progress{
    float: right;
    width: 200px;
    margin-right: 20px;
    height: 20px;
    margin-top: 10px;
    display: none;
    box-shadow: none;
    border: 1px solid #ebebeb;
    position: relative;
}
.progress::before {
    content: 'در حال بارگزاری تصویر';
    background: transparent;
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 99999;
    text-align: center;
    font-size: 13px;
}
.progress-bar{
    box-shadow: none;
    background-color: #f1f102;
    color: #444;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
}
.padding-right-none{
    padding-right: 0px;
}
.remove_person,
.add_person{
    display: inline-block;
    background: #71e0ca;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 7px 50px;
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
.remove_person{
    height: 40px;
    width: 40px;
    padding: 0;
    float: right;
    margin-right: 15px;
    box-shadow: none;
    border:1px solid #ddd;
    background-color: transparent;
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ljk3MSA0Ny45NzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3Ljk3MSA0Ny45NzE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yOC4yMjgsMjMuOTg2TDQ3LjA5Miw1LjEyMmMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBMMjMuOTg2LDE5Ljc0NEw1LjEyMSwwLjg4ICAgYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBjLTEuMTcyLDEuMTcxLTEuMTcyLDMuMDcxLDAsNC4yNDJsMTguODY1LDE4Ljg2NEwwLjg3OSw0Mi44NWMtMS4xNzIsMS4xNzEtMS4xNzIsMy4wNzEsMCw0LjI0MiAgIEMxLjQ2NSw0Ny42NzcsMi4yMzMsNDcuOTcsMyw0Ny45N3MxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWwxOC44NjUtMTguODY0TDQyLjg1LDQ3LjA5MWMwLjU4NiwwLjU4NiwxLjM1NCwwLjg3OSwyLjEyMSwwLjg3OSAgIHMxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyTDI4LjIyOCwyMy45ODZ6IiBmaWxsPSIjZmY2NDY0Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)
}
.remove_person:hover{
    background-color: #fff;
    transition: all .2s ease-in;
}
.add_person{
    float: right;
    margin-bottom: 25px;
    width: 170px;
    margin-left: 15px;
}
.add_person:hover{
    box-shadow: 0px 2px 0px #55c9b2;
    transition: all .2s ease-in;
    text-decoration: none;
    color: #fff;
}
</style>