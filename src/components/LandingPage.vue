<template>
    <div class="row">
        <individual-post
            v-for="post in $store.state.posts.posts"
            v-bind:key="post.postID"
            v-bind:id="post.postID"
            v-bind:author="post.postAuthor"
            v-bind:featurephoto="post.postFeaturePhoto"
            v-bind:title="post.postTitle"
            v-bind:date="post.postDate"
            v-bind:views="post.postViews"
            v-bind:content="post.postContent"
            v-bind:tag="post.postTag"
        ></individual-post>
    </div>
    <button v-on:click="test">Click me</button>
</template>

<script>

import IndividualPost from "./IndividualPost.vue";

export default {
    components: {
        IndividualPost
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
        this.loadPosts();
        this.loadTheme();
        this.loadUsers();
    },
    methods: {
        test(){
            console.log(this.$store.state.posts.posts);
        },
        toRoute(route){
            this.$router.push(route);
        },
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
    },
    
}
</script>
