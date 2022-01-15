<template>
    <div id="profileArea">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div id="profilePictureArea">
                    <img v-bind:src="user.userProfilePic" v-bind:alt="user.userUsername">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6">
                <div id="profileDetailsArea">
                    <div>
                        <h1 id="profileUsername">{{ user.userUsername }}</h1>
                        <div id="profileMeta">
                            <span id="profileFullName">{{ user.userFirstName }} {{ user.userLastName }}</span>
                        </div>
                        <span id="profileBio">{{ bioText }}</span>
                        <div id="profileSocialMediaAccounts">
                            <ul>
                                <li v-show=" user.userFacebook !== '' ">
                                    <a href="">
                                        <!--<img
                                            src="../img/icon/facebook.png"
                                            v-bind:alt="`${user.userFirstName} + 's Facebook`"
                                            title="Facebook"
                                        >-->
                                    </a>
                                </li>
                                <li v-show=" user.userTwitter !== '' ">
                                    <a href="">
                                        <!--<img
                                            src="../img/icon/twitter.png"
                                            v-bind:alt="`${user.userFirstName} + 's Twitter`"
                                            title="Twitter"
                                        >-->
                                    </a>
                                </li>
                                <li v-show=" user.userLinkedIn !== '' ">
                                    <a href="">
                                        <!--<img
                                            src="../img/icon/linkedin.png"
                                            v-bind:alt="`${user.userFirstName} + 's LinkedIn`"
                                            title="LinkedIn"
                                        >-->
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="profilePostsCount">
                            <span>Posts: {{ user.userPostAmount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="profilePostsArea">
        <div class="row">
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
                class="col-xs-12 blogPost"
            >
                <h2 
                    v-on:click="toPost(post.postID)"
                    class="cursor"
                >{{ post.postTitle }}</h2>
                <div class="blogPostMetaArea">
                    <div>
                        <span>Author: </span>
                        <span 
                            v-on:click="toAuthor(post.postAuthor)"
                            class="blogPostAuthorLink"
                        >{{ post.postAuthor }}</span>
                    </div>
                    <span>Date Posted: {{ this.postDates[JSON.parse(post.postID)] }}</span>
                </div>
                <p>{{
                    post.postContent.length > 275 ? `${
                    post.postContent.substring(0,275)}...` :
                    post.postContent
                }}</p>
                <div class="blogPostBottomMetaAreaTwo">
                    <span 
                        v-on:click="toPost(post.postID)"
                        class="cursor blogPostReadMore"
                    >Read More</span>
                    <div>
                        <span class="blogPostTagText">Tags: </span>
                        <span
                            v-on:click="toTag(post.postTag)"
                            class="blogPostIndividualTagText"
                        >{{ post.postTag }}</span>
                    </div>
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
            users: [],
            user: {},
            bioText: "",
            posts: [],
            filteredPosts: [],
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
        const userPromise = new Promise((resolve, reject) => {
            // Retries the promise if the information isn't loaded in fast enough
            const retryPromise = () => {
                setTimeout(() => {
                    if (
                        this.$store.state.users.users.length > 0
                    ) {
                        resolve('Success');
                    } else if (
                        this.$store.state.users.users.length === 0
                    ) {
                        retryPromise();
                    } else {
                        reject("Failed.");
                    }
                }, 25);
            }
            if (
                this.$store.state.users.users.length > 0
            ) {
                resolve('Success');
            } else if (
                this.$store.state.users.users.length === 0
            ) {
                retryPromise();
            } else {
                reject("Failed.");
            }
        });

        const postPromise = new Promise((resolve, reject) => {
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

        userPromise.then(() => {
            this.users = this.$store.state.users.users;
            this.user = this.users.filter((user) => 
                user.userUsername === window.location.href.split("/")[window.location.href.split("/").length - 1]
            )[0];
        })
        postPromise.then(() => {
            this.posts = this.$store.state.posts.posts;
            this.filteredPosts = this.posts.filter((post) => {
                return (
                    post.postAuthor === window.location.href.split("/")[window.location.href.split("/").length - 1]
                );
            });
        })
        .then(() => {
            this.user.bio ?
            this.bioText = this.user.userBio :
            this.bioText = "Nothing interesting to see here...";
            this.posts.forEach((post) => {
                let dateValue = moment.unix(post.postDate).format("MMM Do, YYYY");
                this.postDates.push(dateValue);
            });
        });
    }
}
</script>
