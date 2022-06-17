<!--  -->
<template>
  <footer class="footer-wrap">
    <p class="foot-info">Created with <svg-icon name="heart" /> by Cyang</p>
    <hr class="split-line">
    <div class="copyright-intro d-flex jc-between ai-center">
      <p>Copyright © 2021 Cyang Inc. and its affiliates.</p>
      <nav>
        <span>Chronicle of Events</span>
        <span>Privacy Policy</span>
        <span>Contact Me</span>
      </nav>
    </div>
  </footer>
</template>

<style lang="scss" scope>
.footer-wrap {
  width: 60rem;
  margin: 4.8rem auto 2.4rem;
  .foot-info {
    font-weight: 700;
    @include font_color("footer");
    .icon-heart {
      width: 1.33rem;
      height: 1.33rem;
    }
  }
  .split-line {
    box-sizing: content-box;
    margin: 0.47rem 0px 0.94rem;
    padding: 0px;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, rgb(102, 102, 102) 50%, rgba(255, 255, 255, 0) 40%) center top / 3px 1px repeat-x;
    border: 0px;
  }
  .copyright-intro {
    @include font_color("footer");
    nav {
      span {
        font-size: 0.87rem;
        color: rgb(150, 150, 150);
        @include font_color("footer");
        margin-right: 1rem;
      }
    }
  }
}
</style>