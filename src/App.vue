<template>
  <the-header></the-header>
  <div id="container" class="container">
    <router-view></router-view>
  </div>
</template>

<script>

import Header from "./components/Header.vue";

export default {
  components: {
    'the-header': Header
  },
  data(){
    return {
      isLoading: false,
      error: null,
      posts: this.$store.state.posts.posts,
      users: this.$store.state.users.users,
      theme: this.$store.state.theme.theme
    }
  },
  created(){
    console.log("app init");

    this.loadPosts();
    this.loadTheme();
    this.loadUsers();
  },
  methods: {
    async loadPosts(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('posts/loadPosts', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handlePostsError() {
      this.error = null;
    },
    async loadTheme(refresh = false) {
        this.isLoading = true;
        try {
            await this.$store.dispatch('theme/loadTheme', {
            forceRefresh: refresh,
            });
        } catch (error) {
            this.error = error.message || 'Something went wrong!';
        }
        this.isLoading = false;
        },
        handleThemeError() {
        this.error = null;
    },
    async loadUsers(refresh = false) {
        this.isLoading = true;
        try {
            await this.$store.dispatch('users/loadUsers', {
            forceRefresh: refresh,
            });
        } catch (error) {
            this.error = error.message || 'Something went wrong!';
        }
        this.isLoading = false;
        },
        handleUsersError() {
        this.error = null;
    },
  }
}
</script>


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

</style>