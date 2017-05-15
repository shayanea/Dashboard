<template>
    <div class="project">
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
        <div class="content_holder container-fluid">
            <form @submit.prevent="Save">
                <h4 class="form_title">
                    درج پروژه جدید
                </h4>
                <p class="form_desc">
                    با استفاده از این فرم شما می توانید اطلاعات پروژه جدید خود را وارد کنید.
                </p>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">عنوان</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="title" v-model="project.title" maxlength="58" placeholder="عنوان" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">توضیح کوتاه</label>
                        <input class="form-control col-md-9 col-sm-9 col-xs-12" name="title" v-model="project.description" maxlength="150" placeholder="توضیح کوتاه" /> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">توضیح تکمیلی</label>
                        <quill-editor class="col-md-9 col-sm-9 col-xs-12" v-model="project.content" :options="editorOption" 
                        @change="onEditorChange($event)" @ready="onEditorReady($event)">
                        </quill-editor> 
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">تصویر اصلی</label>
                        <file-base64
                            :multiple="false"
                            :done="GetHeader">
                        </file-base64>
                        <img :src="project.mainimage" class="img-responsive thumbnail"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">گالری پروژه</label>
                        <file-base64
                            :multiple="false"
                            :done="GetGallery">
                        </file-base64>
                        <img :src="item.src" class="img-responsive thumbnail"  v-for="(item, index) in project.gallery"/>
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
    name:'addproject',
    data (){
        return {
            project:{
                title:'',
                description:'',
                content:'',
                mainimage:'',
                gallery:[]
            },editorOption: {
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
        'navigation':Menu,
        'profile':Profile,
        'logo':Logo,
        fileBase64 
    },
    created(){
        return document.title = "درج پروژه جدید";
    },
    methods: {
        GetHeader(file){
            this.project.mainimage = file.base64;
        },
        GetGallery(file){
            this.project.gallery.push({src:file.base64});
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
            this.$http.post('http://panel.hex.team/api/setwidget',{
                widget:'project',
                data:'test'
            },{
                headers: {
                   'Authorization':localStorage.getItem('Authorization') 
                }
            })
            .then(function(res){
                console.log(res.data);
            },function(err){
                console.log(err);
            });
            console.log(about);
        }
    }
}
</script>

<style>
.project .content_holder{
    position: absolute;
    left: 80px;
    top: 100px;
    right: 40px;
    bottom: 80px;
    padding: 0;
    z-index: 99;
}
.project form{
    float: right;
    width: 100%;
}
.project .form_title{
    text-align: right;
    font-family: "IRANSANS BOLD";
    padding-bottom: 10px;
    font-size: 1.5em;
}
.project .form_desc{
    text-align: right;
    padding-bottom: 10px;
    font-size: 1em;
    direction: rtl;
    margin-bottom: 25px;
}
.project form label{
    float: right;
    margin-bottom: 15px;
    text-align: right;
}
.project form .form-group{
    padding-bottom:15px;
}
.project form .form-control{
    text-align: right;
    outline: none;
    box-shadow: none;
    background-color: #f5f5f5;
    border: 1px solid rgba(34,36,38,.15);
    direction: rtl;
    padding: 10px 12px;
}
.project form textarea.form-control{
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
.project .thumbnail{
    border-radius: 0;
    border:0;
    height: auto;
    max-height: 150px;
    padding: 0;
    background: transparent;
    float: right;
    margin-right: 20px;
}
.project .save{
    background: #363636;
    color: #fff;
    box-shadow: none;
    outline: none;
    padding: 5px 40px;
    font-size: 15px;
    float: right;
    margin-bottom: 50px;
}
.project .save:hover{
    opacity: .7;
}
</style>