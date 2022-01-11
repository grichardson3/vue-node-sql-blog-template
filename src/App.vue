<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

img {
  width: 100%; /* bootstrap doesn't do this automatically */
}

</style>