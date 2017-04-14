<template>
  <div id="Login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-8 col-xs-12 login_bg">
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  created (){
    document.title = "login";
  }
}
</script>

<style scoped>
  #Login .container .row [class*=' col-']{
    min-height:700px;
  }
  .login_bg{
    /*background-image:url('../assets/login_bg.jpg');
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;*/
  }
</style>
