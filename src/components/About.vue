<template>
    <div class="about">
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
        <div class="content_holder container-fluid">
            <form @submit.prevent="Save">
                <h4 class="form_title">
                        تدوین اطلاعات دربـاره ما
                </h4>
                <p class="form_desc">
                    با استفاده از این فرم شما می توانید اطلاعات خود را ویرایش کنید.
                </p>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">عنوان</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="title" v-model="about.title" maxlength="58" placeholder="عنوان" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">توصیحات</label> 
                        <quill-editor class="col-md-9 col-sm-9 col-xs-12" v-model="about.description" :options="editorOption" 
                        @change="onEditorChange($event)" @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">تصویر اصلی</label>
                        <file-base64
                            :multiple="false"
                            :done="GetHeader">
                        </file-base64>
                        <img :src="header" class="img-responsive thumbnail"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12" v-for="(item, index) in about.teams">
                        <label class="col-md-3 col-sm-3 col-xs-12">{{index+1}} اعضای تیم</label>
                        <file-base64
                            :multiple="false"
                            :done="GetTeam"
                            :index="index">
                        </file-base64>
                        <img :src="files[index].thumbnail" class="img-responsive thumbnail"/>
                        <div class="form-group col-md-3 col-sm-3 col-xs-12">
                            <input class="form-control" name="name" v-model="item.name" maxlength="58" placeholder="نام" />
                        </div>
                        <div class="form-group col-md-3 col-sm-3 col-xs-12"> 
                            <input class="form-control" name="position" v-model="item.position" maxlength="58" placeholder="سمت" /> 
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-12"></div>
                    <div class="col-md-9 col-sm-9 col-xs-12" style="padding-right:0px;">
                        <button type="submit" class="btn save">ذخیــره</button>
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
            header:'',
            files:[{
                thumbnail:'',
            },{
                thumbnail:'',
            }],
            about:{
                title : '',
                description : '',
                header:'',
                teams:[
                    {
                        image:'',
                        name:'Eng.Mehdi Mohammadi',
                        position:'CEO'
                    },
                    {
                        image:'',
                        name:'Eng.Mehdi Mohammadi',
                        position:'CEO'
                    }
                ],
                files:[]
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
            this.$http.get('http://panel.hex.team/api/getwidget/about',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res){
                console.log(res.data);
            },function(err){
                console.log(err);
            });
        },
        GetHeader(file){
            this.header = file.base64;
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.hex.team/api/upload', formData, {
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            }).then(function (response){
                this.header = file.base64;
                this.about.files.push({'src':response.data.name});
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        GetTeam(file){
            this.files[file.index].thumbnail = file.base64;
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.hex.team/api/upload', formData, {
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            }).then(function (response){
                this.file[index].thumbnail = file.base64;
                this.about.teams[file.index].image = response.data.name;
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        onEditorReady(editor) {
            editor.format('align', 'right');
        },
        onEditorChange(editor){
            // console.log(editor);
            // editor.clipboard.addMatcher (Node.ELEMENT_NODE, function (node) {
            //     console.log(node);
            // });
        },
        Save(){
            console.log(this.about);
            this.$http.post('http://panel.hex.team/api/setwidget',{
                widget:'about',
                data:JSON.stringify(this.about)
            },{
                headers: {
                   'Authorization':localStorage.getItem('Authorization') 
                }
            })
            .then(function(res){
                if(res.status == 200){
                    alert('send');
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
    border: 1px solid rgba(34,36,38,.15);
    direction: rtl;
    padding: 10px 12px;
}
.about form textarea.form-control{
    height: 80px;
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
.about .thumbnail{
    border-radius: 0;
    border:0;
    height: auto;
    max-height: 150px;
    padding: 0;
    background: transparent;
    float: right;
    margin-right: 20px;
}
.about .save{
    background: #363636;
    color: #fff;
    box-shadow: none;
    outline: none;
    padding: 5px 40px;
    font-size: 15px;
    float: right;
    margin-bottom: 50px;
}
.about .save:hover{
    opacity: .7;
}
</style>