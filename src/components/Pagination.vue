<template>
    <nav aria-label="Page navigation example" class=" col align-self-end">
    <ul class="pagination">
        <li class="page-item" v-for="link in links" :key="link.label">
            <a 
            class="page-link" 
            :class="{'active':link.active,'disabled':!link.url}"
            href="#" 
            @click="go(link.url)"
            >
                {{link.label}}
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
    export default {
        props: {
            links: {
                type: Array,
            },
        },
        methods: {
            linkHTML() {
                this.links[0].label = 'prev';
                this.links[this.links.length-1].label = 'next';
            },
            go(url){
                this.$emit('fetchLink',url);
            }
        },
        mounted(){
            this.linkHTML();
        },
        updated(){
            this.linkHTML();
        }
    }
</script>

<style lang="scss" scoped>

</style>