<template>
    <div class="about">
        <navigation></navigation>
        <profile></profile>
        <logo></logo>
        <div class="content_holder container-fluid">
            <form>
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
                        @change="onEditorChange($event)">
                        </quill-editor>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">تصویر اصلی</label>
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

export default {
    name:'about',
    data (){
        return {
            about:{
                title : '',
                description : ''
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
        'profile': Profile
    },
    methods :{
        onEditorChange(editor) {
            return this.about.description = editor.text;
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
</style>