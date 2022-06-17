<!--  -->
<template>
  <div class="player-container" :class="{'mini': isMini ? 'mini' : ''}">
    <Aplayer
      class="player-wrap"
      :showLrc="true"
      :listFolded="true"
      :mini="isMini"
      :list="list"
      :music="list[0]"
      listMaxHeight="100px"
    />
    <div class="mini-border" @click="miniHandle">
      <SvgIcon name="arrow" />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import SvgIcon from "../SvgIcon/index.vue";
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isMini: true,
      musicDetails: {
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
        src: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
        pic: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg'
      },
    };
  },
  components: {
    Sidebar,
    SvgIcon
},
  methods: {
    miniHandle() {
      this.isMini = !this.isMini
    },
  }
};
</script>

<style lang="scss" scope>
.player-container {
  position: relative;
  width: 400px;
  height: 90px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  border: 1px solid #E6E6E6;
  box-sizing: content-box;
  transition: all 0.3s;
  background-color: #fff;
  &.mini {
    width: 66px;
    height: 66px;
    .mini-border {
      transform: rotate(180deg);
    }
  }
  .player-wrap {
    // position: absolute !important;
    // width: 100%;
    // height: 100%;
  }
  .mini-border {
    width: 18px;
    height: 100px;
    line-height: 100px;
    background-color: #E6E6E6;
    position: absolute;
    right: -18px;
    top: -1px;
    z-index: 999;
    text-align: center;
    color: rgb(99, 99, 99);
    .svg-icon {
      width: 20px;
    }
  }
}
</style>
