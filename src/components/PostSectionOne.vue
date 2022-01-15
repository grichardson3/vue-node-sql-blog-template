<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-bind:id="`post${id}`">
        <div v-on:click="toPost(id)">
            <div class="blogPostFeaturePhoto">
                <img 
                    v-bind:title="title"
                    v-bind:alt="title"
                    v-bind:src="featurephoto"
                >
            </div>
        </div>
        <div class="blogPostTextArea" v-bind:id="id">
            <h2 v-on:click="toPost(id)">
                <span class="blogPostTitle">{{ shortenedTitle }}</span>
            </h2>
            <div class="blogPostMetaArea">
                <div>
                    <span>Author: </span>
                    <span class="cursor" v-on:click="toAuthor(author)">{{ author }}</span>
                </div>
                <span class="blogPostDateText">Date Posted: {{ convertedDate }}</span>
            </div>
            <p class="blogPostContent">{{ postExcerpt }}</p>
            <div class="blogPostBottomMetaArea">
                <span class="blogPostReadMore" v-on:click="toPost(id)">Read More</span>
                <div>
                    <span class="blogPostTagText">Tags: </span>
                    <span class="blogPostIndividualTagText" v-on:click="toTag(tag)">{{ tag }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from "moment";

export default {
    props: ['id', 'author', 'content', 'date', 'featurephoto', 'title', 'views', 'tag'],
    data(){
        return {
            shortenedTitle: "",
            postExcerpt: "",
            convertedDate: ""
        }
    },
    created(){
        this.title.length > 75 ? this.shortenedTitle = this.title.substring(0, 75) : this.shortenedTitle = this.title;
        this.content.length > 200 ? this.postExcerpt = this.content.substring(0, 200) : this.postExcerpt = this.content;
        this.convertedDate = moment.unix(this.date).format("MMM Do, YYYY");
    },
    methods: {
        toAuthor(author){
            this.$router.push("/author/" + `${author}`)
        },
        toPost(id){
            this.$router.push("/post/" + `${id}`)
        },
        toTag(tag){
            this.$router.push("/tag/" + `${tag}`)
        }
    }
}

</script>
