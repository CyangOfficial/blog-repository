<template>
  <div class="card-panel-group">
    <div class="card-panel">
      <div class="card-panel-icon visitor">
        <svg-icon name="visitor" />
      </div>
      <div class="card-panel-info">
        <div class="title">访客数量</div>
        <div class="num">
          <CountTo :start-val="0" :end-val="213" :duration="1600" />
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-panel-icon reg-user">
        <svg-icon name="user" />
      </div>
      <div class="card-panel-info">
        <div class="title">注册用户</div>
        <div class="num">
          <CountTo :start-val="0" :end-val="11" :duration="1600" />
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-panel-icon article-num">
        <svg-icon name="post" />
      </div>
      <div class="card-panel-info">
        <div class="title">文章数量</div>
        <div class="num">
          <CountTo :start-val="0" :end-val="15" :duration="1600" />
        </div>
      </div>
    </div>
    <div class="card-panel">
      <div class="card-panel-icon message-num">
        <svg-icon name="message" />
      </div>
      <div class="card-panel-info">
        <div class="title">留言数量</div>
        <div class="num">
          <CountTo :start-val="0" :end-val="121" :duration="1600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CountTo } from 'vue3-count-to'
export default {
  name: 'Card',
  components: {
    CountTo
  },
  props: {
  },
  setup () {

  }
}
</script>
<style lang='scss' scope>
.card-panel-group {
  display: flex;
  justify-content: space-between;
  .card-panel {
    width: 100%;
    padding: 10px 20px;
    margin-right: 25px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    box-shadow: 2px 2px 20px rgba(138, 138, 138, 0.1);
    border-radius: 5px;
    cursor: pointer;
    transition: box-shadow 0.25s;
    &:hover {
      box-shadow: 2px 2px 20px rgba(138, 138, 138, 0.3);
    }
    &:last-child {
      margin: 0;
    }
    .card-panel-icon {
      width: 80px;
      height: 80px;
      font-size: 40px;
      line-height: 80px;
      text-align: center;
      background: #fff;
      border-radius: 5px;
      color: #fff;
      &.visitor {
        background-color: #40c9c6;
      }
      &.reg-user {
        background-color: #36a3f7;
      }
      &.article-num {
        background-color: #9694FF;
      }
      &.message-num {
        background-color: #FF7976;
      }
    }
    .card-panel-info {
      margin-right: 15px;
      font-weight: 700;
      .title {
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin: 15px 0;
      }
      .num {
        font-size: 20px;
        color: #666;
      }
    }
  }
}
</style>
