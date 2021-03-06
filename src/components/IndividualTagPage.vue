<template>
    <div id="tagPostsResultString">
        <h2>Filter by Tag:
            <span id="tagPostsIndividualTag">
                {{ postTagText }}
            </span>
        </h2>
    </div>
    <div
        v-for="post in filteredPosts"
        v-bind:key="post.postID"
        v-bind:id="post.postID"
        v-bind:dbid="post.postDBID"
        v-bind:author="post.postAuthor"
        v-bind:content="post.postContent"
        v-bind:date="post.postDate"
        v-bind:featurephoto="post.postFeaturePhoto"
        v-bind:tag="post.postTag"
        v-bind:title="post.postTitle"
        v-bind:views="post.postViews"
        class="row"
    >
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div 
                class="blogPostFeaturePhoto"
                v-on:click="toPost(post.postID)"
            >
                <img 
                    v-bind:src="post.postFeaturePhoto"
                    v-bind:alt="post.postTitle"
                    v-bind:title="post.postTitle"
                >
            </div>
            <h2 v-on:click="toPost(post.postID)">
                <span class="blogPostTitle">{{ post.postTitle }}</span>
            </h2>
            <div class="blogPostMetaArea">
                <div>
                    <span>Author: </span>
                    <span 
                        class="blogPostAuthorLink"
                        v-on:click="toAuthor(post.postAuthor)"
                    >{{ post.postAuthor }}</span>
                </div>
                <span class="blogPostDateText">
                    Date Posted: {{ this.postDates[post.postID] }}
                </span>
            </div>
            <p class="blogPostContent">
                {{
                    post.postContent.length > 200 ? 
                    `${post.postContent.substring(0,200)}...` : 
                    post.postContent
                }}
            </p>
            <div class="blogPostBottomMetaArea">
                <span
                    class="blogPostReadMore"
                    v-on:click="toPost(post.postID)"
                >Read More</span>
                <div>
                    <span class="blogPostTagText">Tags: </span>
                    <span
                        class="blogPostIndividualTagText"
                        v-on:click="toTag(post.postTag)"
                    >{{ post.postTag }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from "moment";

export default {
    data(){
        return {
            posts: [],
            filteredPosts: [],
            postTagText: "",
            postAmount: 0,
            postDates: []
        }
    },
    methods: {
        toPost(id){
            this.$router.push(`/post/` + `${id}`);
        },
        toAuthor(author){
            this.$router.push(`/author/` + author);
        },
        toTag(tag){
            this.$router.push(`/tag/` + tag);
        }
    },
    created(){
        const promise = new Promise((resolve, reject) => {
            // Retries the promise if the information isn't loaded in fast enough
            const retryPromise = () => {
                setTimeout(() => {
                    if (
                        this.$store.state.posts.posts.length > 0
                    ) {
                        resolve('Success');
                    } else if (
                        this.$store.state.posts.posts.length === 0
                    ) {
                        retryPromise();
                    } else {
                        reject("Failed.");
                    }
                }, 25);
            }
            if (
                this.$store.state.posts.posts.length > 0
            ) {
                resolve('Success');
            } else if (
                this.$store.state.posts.posts.length === 0
            ) {
                retryPromise();
            } else {
                reject("Failed.");
            }
        });
        promise.then(() => {
            this.posts = this.$store.state.posts.posts;
            this.filteredPosts = this.posts.filter((post) => post.postTag.toLowerCase().includes(window.location.href.split("/")[window.location.href.split("/").length - 1]));
            this.postTagText = this.posts[0].postTag;
            this.posts.forEach((post) => {
                let dateValue = moment.unix(post.postDate).format("MMM Do, YYYY");
                this.postDates.push(dateValue);
            });
        });
    }
}
</script>
