<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <header>
      <nav>
        <h1>
          <RouterLink to="/">
            Balancer Pool Browser
          </RouterLink>
        </h1>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

.wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 50px 20px;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}


nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
