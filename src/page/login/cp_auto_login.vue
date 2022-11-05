<template>
    <!---企业微信APP自动登录-->
    <div class="login-container"
       ref="login" >
    
    <div class="login-weaper animated bounceInDown">
      <!-- <div class="login-left">
        <div class="login-time">
          {{time}}
        </div>
        <p class="title">正在登录4</p>
        <div style="font-size: 15px">
          正在登录2
        </div> 
      </div> -->
      <div class="login-border">
        <div class="login-main">
          <div class="login-title" style="font-size: 15px"> 
            <span>正在登录...</span>
            
          </div>    
        </div> 
      </div>
    </div>
  </div>
</template>
<script> 
  import {mapGetters} from "vuex"; 
  import {getQueryString, getTopUrl} from "@/util/util";

  export default {
    name: "login",
    components: { 
    },
    data() {
      return { 
        socialForm: {
          tenantId: "000000",
          source: "",
          code: "",
          state: "",
        }
      };
    }, 
    created() {
      this.handleLogin(); 
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["website", "tagWel"])
    },
    props: [],
    methods: { 
      handleLogin() {
        const topUrl = getTopUrl();
        const redirectUrl = "/oauth/callback/wechat_enterprise_web/";
        const ssoCode = "?code=";
//        /fcb-auth/oauth/callback/wechat_enterprise_web
//http://api.yuandinghr.cn:1888/#/cp_auto_login/wechat_enterprise_web

//http://api.yuandinghr.cn:8090/fcb-auth/oauth/render/wechat_enterprise_web

        this.socialForm.source = getQueryString("source");
        this.socialForm.code = getQueryString("code");
        this.socialForm.state = getQueryString("state");
        console.log(this.socialForm);
        
        if (validatenull(this.socialForm.source) && topUrl.includes(redirectUrl)) {
          let source = topUrl.split("?")[0];
          source = source.split(redirectUrl)[1];
          this.socialForm.source = source;
        }

        if (topUrl.includes(redirectUrl) && !validatenull(this.socialForm.source) && !validatenull(this.socialForm.code) && !validatenull(this.socialForm.state)) {
          const loading = this.$loading({
            lock: true,
            text: '第三方系统登录中,请稍后。。。',
            spinner: "el-icon-loading"
          });
          this.$store.dispatch("LoginBySocial", this.socialForm).then(() => {
            window.location.href = topUrl.split(redirectUrl)[0];
            this.$router.push({path: this.tagWel.value});
            loading.close();
          }).catch(() => {
            loading.close();
          });
        }  
      }
    }
  };
</script>

<style lang="scss">
  @import "@/styles/login.scss";
</style>
