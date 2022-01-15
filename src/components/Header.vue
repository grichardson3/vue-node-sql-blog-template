<template>
    <header>
        <div 
            id="logoArea"
            class="cursor"
            v-on:click="toHomeRoute"
        >
            <img
                src="../img/mevn-logo-white.png"
                alt="MEVN Blog"
                title="MEVN Blog"
            />
        </div>
        <div id="headerRightSide">
            <div id="searchBar" class="input-group">
                <input id="searchInput" class="form-control" placeholder="Search by title..." type="text" v-model="searchValue">
                <div class="input-group-append">
                    <button id="searchButton" class="btn btn-primary" type="button" v-on:click="search">Search</button>
                </div>
            </div>
            <button class="btn btn-secondary" v-on:click="toLogin">Login</button>
        </div>
    </header>
</template>

<script>

export default {
    data(){
        return {
            searchValue: window.location.href.split("/")[window.location.href.split("/").length - 1]
        }
    },
    methods: {
        search(){
            if (this.searchValue.trim() !== "") {
                this.$router.push(`/search/${this.searchValue}`);
            }
        },
        toHomeRoute(){
            this.$router.push('/');
        },
        toLogin(){
            window.location.href = "https://stoic-jepsen-c8202a.netlify.app/login";
        }
    }
}
</script>
