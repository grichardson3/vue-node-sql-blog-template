<template>
<div>
    <div id="individualPostMetaArea">
        <h2 id="individualPostTitle">{{ this.post.postTitle }}</h2>
        <div id="individualPostBottomMeta">
            <div>
                <span id="individualPostAuthor">Author: </span>
                <span
                    id="individualPostAuthorLink"
                    v-on:click="toAuthor(post.postAuthor)"
                >{{ this.post.postAuthor }}</span>
            </div>
            <div id="individualPostDateViews">
                <span id="individualPostDate">Date Posted: {{ this.postDates[post.postID] }}</span>
            </div>
        </div>
        <div id="individualPostFeaturePhoto">
            <img 
                v-bind:src="this.post.postFeaturePhoto" 
                v-bind:alt="this.post.postTitle"
                v-bind:title="this.post.postTitle"
            >
        </div>
        <article id="individualPostArticle">{{ this.post.postContent }}</article>
        <div id="individualPostTags">
            <span>Tags: </span>
            <span
                v-on:click="toTag(post.postTag)"
                class="individualPostIndividualTag"
            >{{ this.post.postTag }}</span>
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
            post: {},
            postDates: []
        }
    },
    created(){
        const promise = new Promise((resolve, reject) => {
            // Retries the promise if the information isn't loaded in fast enough
            const retryPromise = () => {
                setTimeout(() => {
                    if (this.$store.state.posts.posts.length > 0) {
                        resolve('Success');
                    } else if (this.$store.state.posts.posts.length === 0) {
                        retryPromise();
                    } else {
                        reject("Failed.");
                    }
                }, 25);
            }
            if (this.$store.state.posts.posts.length > 0) {
                resolve('Success');
            } else if (this.$store.state.posts.posts.length === 0) {
                retryPromise();
            } else {
                reject("Failed.");
            }
        })
        promise.then(() => {
            this.posts = this.$store.state.posts.posts;
            this.post = this.posts.filter((post) => {
                return (
                    post.postID === JSON.parse(window.location.href.split("/")[window.location.href.split("/").length - 1])
                );
            })[0];
            this.posts.forEach((post) => {
                let dateValue = moment.unix(post.postDate).format("MMM Do, YYYY");
                this.postDates.push(dateValue);
            });
        });
    }
}
</script>
