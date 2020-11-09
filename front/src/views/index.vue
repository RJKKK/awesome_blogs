<template>
  <div class="main">
    <div class="content">
      <div class="banner"></div>
      <div class="title">请选择模块，尽情创作把！</div>
      <div class="select-menu">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
      <img class="footer" src="../assets/components/deco_1.png" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
});
</script>

<style scoped lang="less">
.main {
  background-image: url("../assets/components/bg-index.png");
  min-width: 320px;
  width: 100%;
  /*height: 100vh;*/
}
.content {
  max-width: 720px;
  min-width: inherit;
  margin: 0 auto;
  height: inherit;
  .banner {
    height: 80px;
  }
  .title {
    height: 60px;
  }
  .select-menu {
    width: inherit;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(10, 16, 20, 0.24);
    height: calc(100% - 140px);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    flex-wrap: wrap;
    .item {
      width: 200px;
      height: 200px;
      background-image: url(../assets/components/moduleItem.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .footer {
    /*position: absolute;*/
    margin-top: -60px;
    /*margin: 0 auto;*/
    bottom: 0px;
  }
}
</style>