<template>
  <div class="left">
    <div class="title f24">
      <!-- <svg-icon icon-class="logo" class="mr5" /> -->
      <img src="@/assets/img/logo.png" class="w24 mr5"/>
      <span>{{ $t('jy') }}</span>
    </div>
    <div class="con">
      <!-- <div class="title mb24">{{ $t('login_title_text') }}</div>
      <div class="info mb24">
        {{ $t('login_info_text') }}
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left {
  // padding: 32px;
  position: relative;
  width: 100%;
  height: 100%;
  & > .title {
    position: absolute;
    top: 32px;
    left: 32px;
    color: #fff;
    font-weight: 700;
    line-height: 28px;
    .svg-icon {
      width: 38px!important;
      height: 28px!important;
    }
  }
  .con {
    margin-top: 157px;
   
    color: #fff;
    text-align: center;
    .title {
      font-size: 32px;
      color: #FFFFFF;
      line-height: 41px;
      letter-spacing: 1px;
      font-weight: 700;
    }
    .info {
      font-size: 18px;
      font-weight: 400;
      color: #BDBFED;
      line-height: 25px;
    }
  }
}

</style>