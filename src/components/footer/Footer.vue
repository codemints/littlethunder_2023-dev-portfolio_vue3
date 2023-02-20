<template>
  <footer class="bg-clr-800">
    <div class="footer-logo">
      <a href="/">
        <img class="text-center mx-auto" src="@img/logo_light-header.png" alt="website logo">
        <h4 id="site-title" class="text-center uppercase text-clr-orange"><span class="text-white">Little</span>Thunder.<span class="text-clr-blue">_</span></h4>
        <p class="text-white text-center">designed and built with care by me.</p>
      </a>
    </div>
    <div class="footer-icons bg-clr-400">
      <h4 class="text-center uppercase text-clr-200">This site is proudly built with these technologies:</h4>
      <div class="footer-icons--container">
        <a href="#">
          <img src="@img/brand_vue-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_pinia-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_sass-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_tailwind-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_fontawesome-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_gsap-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_axios-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_supabase-light.png" alt="">
        </a>
        <a href="#">
          <img src="@img/brand_netlify-light.png" alt="">
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
footer {
  .footer-logo {
    padding-inline: 5rem;
    padding-block: 2rem;

    img {
      width: auto;
      height: 4.8rem;
    }

    h4 {
      margin-top: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-top: 0.6rem;
    }
  }

  .footer-icons {
    padding-inline: 5rem;
    padding-block: 3.6rem;

    .footer-icons--container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      margin-top: 2rem;

      img {
        width: auto;
        height: 3.2rem;
      }
    }
  }
}
</style>