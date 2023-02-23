<template>
  <footer class="bg-clr-800 footer__main">
    <div class="footer-logo">
      <a href="/">
        <img class="text-center mx-auto" src="@img/logo_light-header.png" alt="website logo">
        <h4 id="site-title" class="text-center uppercase text-clr-orange"><span class="text-white">Little</span>Thunder.<span class="text-clr-blue">_</span></h4>
      </a>
      <p class="text-white text-center">designed and built from scratch by me.</p>
    </div>
    <div class="footer-icons bg-clr-400">
      <h4 class="text-center uppercase text-clr-200">This site is proudly built with these technologies:</h4>
      <div class="github-link">
        <a href="https://github.com/codemints/littlethunder_2023-dev-portfolio_vue3" target="_blank">
          <p class="text-center text-clr-blue">the code for this site can be viewed here:</p>
          <i class="fa-brands fa-github text-clr-blue"></i>
        </a>
      </div>
      <div class="footer-icons__container">
        <a
        v-for="(val, key) in iconTitles"
        :key="key"
        :href="val"
        target="_blank">
          <img :src="`./src/assets/img/brand_${key}-${isDark ? 'light' : 'dark'}.png`" :alt="key"/>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const isDark = ref(true)
const iconTitles = {
  vue: 'https://vuejs.org/',
  pinia: 'https://pinia.vuejs.org/',
  sass: 'https://sass-lang.com/',
  tailwind: 'https://tailwindcss.com/',
  fontawesome: 'https://fontawesome.com/',
  gsap: 'https://greensock.com/gsap/',
  axios: 'https://axios-http.com/',
  supabase: 'https://supabase.com/',
  netlify: 'https://www.netlify.com/'
}

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

    .github-link {

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      p {
        font-size: 1.2rem;}

      i {
        font-size: 1.8rem;
      }
    }

    .footer-icons__container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      margin-top: 3.2rem;

      img {
        width: auto;
        height: 3.2rem;
        transition: filter 0.4s ease;

        &:hover {
          filter: brightness(2);
        }
      }
    }
  }
}
</style>