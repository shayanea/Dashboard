<template>
    <div class="project">
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
            <form @submit.prevent="Update">
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
                        <label class="col-md-3 col-sm-3 col-xs-12">توضیح کامل</label> 
                        <textarea class="form-control col-md-9 col-sm-9 col-xs-12" v-model="project.content" spellcheck="false"></textarea>
                    </div>
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">تصویر اصلی</label>
                        <file-base64
                            :multiple="false"
                            :done="UploadHeader">
                        </file-base64>
                        <div class="progress header_image">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0"
                            aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-3 col-xs-12"></div>
                        <figure v-if="project.header">
                            <img :src="project.header" class="img-responsive thumbnail"/>
                            <span class="remove_img" @click="RemoveHeader()"></span>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                        <label class="col-md-3 col-sm-3 col-xs-12">گالری پروژه</label>
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
                        <div class="col-md-9 col-sm-9 col-xs-12 padding-right-none">
                            <figure v-for="(item, index) in project.gallery">
                                <img :src="item.src" class="img-responsive thumbnail"/>
                                <span class="remove_img" @click="RemoveGallery(index)"></span>
                            </figure>
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
    name:'editproject',
    data (){
        return {
            ShowLoader:false,
            id:'',
            project:{
                title:'',
                description:'',
                content:'',
                header:null,
                gallery:[]
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
        return this.GetData(),
        document.title = "درج پروژه جدید";
    },
    methods: {
        GetData(){
            this.ShowLoader = true;
            this.$http.get('http://panel.hex.team/api/getwidget/project',{
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                }
            })
            .then(function(res) {
                console.log(res.data);
                var item = res.data;
                for(var i = 0;item.length > i; i++){
                    if(item[i].id == this.$route.params.id){
                        this.project = JSON.parse(item[i].data);
                        this.id = this.$route.params.id;
                    }
                }
                this.ShowLoader = false;
            },function(err){
                console.log(err);
                this.ShowLoader = false;
            });
        },
        UploadHeader(file){
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.hex.team/api/upload', formData, {
                headers:{
                    'Authorization':localStorage.getItem('Authorization')
                },
                progress(e) {
                    if (e.lengthComputable) {
                        $('.header_image').css('display','block');
                        $('.header_image .progress-bar').css('width',parseInt((e.loaded / e.total ) * 100)+"%");
                    }
                }
            }).then(function (response){
                $('.header_image').css('display','none');
                $('.header_image .progress-bar').css('width',"0%");
                this.project.header = 'http://panel.hex.team/api/download/' + response.data.name;
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        RemoveHeader(){
            this.project.header = null;
        },
        UploadGallery(file){
            var formData = new FormData();
            formData.append('file', file.file);
            this.$http.post('http://panel.hex.team/api/upload', formData, {
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
                this.project.gallery.push({src: 'http://panel.hex.team/api/download/' + response.data.name});
            }, function (response) {
                console.log('Error occurred...');
            });
        },
        RemoveGallery(index){
            this.project.gallery.splice(index,1);
        },
        Update(){
            this.ShowLoader = true;
            console.log(this.project);
            this.$http.post('http://panel.hex.team/api/setwidget',{
                id:this.id,
                data:JSON.stringify(this.project)
            },{
                headers: {
                   'Authorization':localStorage.getItem('Authorization') 
                }
            })
            .then(function(res){
                console.log(res.data);
                if(res.status == 200){
                    this.ShowLoader = false;
                }
            },function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style>
</style>