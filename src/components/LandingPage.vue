<template>
    <div id="postSectionOne" class="row">
        <post-section-one
            v-for="postOne in firstSectionPosts"
            v-bind:key="postOne.postID"
            v-bind:id="postOne.postID"
            v-bind:author="postOne.postAuthor"
            v-bind:featurephoto="postOne.postFeaturePhoto"
            v-bind:title="postOne.postTitle"
            v-bind:date="postOne.postDate"
            v-bind:views="postOne.postViews"
            v-bind:content="postOne.postContent"
            v-bind:tag="postOne.postTag"
        ></post-section-one>
    </div>
    <div id="postSectionTwo" class="row">
        <post-section-two
            v-for="postTwo in secondSectionPosts"
            v-bind:key="postTwo.postID"
            v-bind:id="postTwo.postID"
            v-bind:author="postTwo.postAuthor"
            v-bind:featurephoto="postTwo.postFeaturePhoto"
            v-bind:title="postTwo.postTitle"
            v-bind:date="postTwo.postDate"
            v-bind:views="postTwo.postViews"
            v-bind:content="postTwo.postContent"
            v-bind:tag="postTwo.postTag"
        ></post-section-two>
    </div>
    <div id="tagBrowser" class="row">
        <tag-browser></tag-browser>
    </div>
    <div id="postSectionThree" class="row">
        <post-section-three
            v-for="postThree in thirdSectionPosts"
            v-bind:key="postThree.postID"
            v-bind:id="postThree.postID"
            v-bind:author="postThree.postAuthor"
            v-bind:featurephoto="postThree.postFeaturePhoto"
            v-bind:title="postThree.postTitle"
            v-bind:date="postThree.postDate"
            v-bind:views="postThree.postViews"
            v-bind:content="postThree.postContent"
            v-bind:tag="postThree.postTag"
        ></post-section-three>
    </div>
    <!--<button v-on:click="test">Click me</button>-->
</template>

<script>

import PostSectionOne from "./PostSectionOne.vue";
import PostSectionTwo from "./PostSectionTwo.vue";
import PostSectionThree from "./PostSectionThree.vue";
import TagBrowser from "./TagBrowser.vue";

export default {
    components: {
        PostSectionOne,
        PostSectionTwo,
        PostSectionThree,
        TagBrowser,
    },
    data(){
        return {
            isLoading: false,
            error: null,
            posts: [],
            users: [],
            theme: [],
            firstSectionPosts: [],
            secondSectionPosts: [],
            thirdSectionPosts: [],
        }
    },
    created(){
        const promise = new Promise((resolve, reject) => {
            // Retries the promise if the information isn't loaded in fast enough
            const retryPromise = () => {
                setTimeout(() => {
                    if (
                        this.$store.state.posts.posts.length > 0 ||
                        this.$store.state.users.users.length > 0 ||
                        this.$store.state.theme.theme.length > 0
                    ) {
                        resolve('Success');
                    } else if (
                        this.$store.state.posts.posts.length === 0 ||
                        this.$store.state.users.users.length === 0 ||
                        this.$store.state.theme.theme.length === 0
                    ) {
                        retryPromise();
                    } else {
                        reject();
                    }
                }, 500);
            }
            if (
                this.$store.state.posts.posts.length > 0 ||
                this.$store.state.users.users.length > 0 ||
                this.$store.state.theme.theme.length > 0
            ) {
                resolve('Success');
            } else if (
                this.$store.state.posts.posts.length === 0 ||
                this.$store.state.users.users.length === 0 ||
                this.$store.state.theme.theme.length === 0
            ) {
                retryPromise();
            } else {
                reject();
            }
        })
        promise.then(() => {

            this.posts = this.$store.state.posts.posts;
            this.users = this.$store.state.users.users;
            this.theme = this.$store.state.theme.theme;

        }).then(() => {
            // For posts array length smaller than 2
            if (this.posts.length >= 2) {
                for (let i = 0; i < 2; i++) {
                    this.firstSectionPosts.push(this.posts[i]);
                }
            } else {
                for (let i = 0; i < this.posts.length; i++) {
                    this.firstSectionPosts.push(this.posts[i]);
                }
            }

            // For posts array length smaller than 7
            if (this.posts.length >= 8) {
                for (let i = 2; i < 8; i++) {
                    this.secondSectionPosts.push(this.posts[i]);
                }
            } else {
                for (let i = 2; i < this.posts.length; i++) {
                    this.secondSectionPosts.push(this.posts[i]);
                }
            }

            // For the rest of the posts
            if (this.posts.length > 8) {
                for (let i = 8; i < this.posts.length; i++) {
                    this.thirdSectionPosts.push(this.posts[i]);
                }
            }
        });
    },
    methods: {
        test(){
            console.log(this.posts);
        },
        toRoute(route){
            this.$router.push(route);
        },
    },
    
}
</script>
