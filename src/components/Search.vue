<template>
    <div class="d-flex mt-4">
        <select v-if="categories.length != 0" class="form-select ms-auto mx-2 w-25" v-model="selectedCategory" aria-label="Default select example" @change="changeSubcategory">
            <option value="0">Select Category</option>
            <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
            >
            {{category.title}}
            </option>
        </select>
        <select v-if="categories.length != 0" class="form-select mx-2 w-25" v-model="selectedSubCategory" aria-label="Default select example" @change="search">
            <option value="0">Select SubCategory</option>
            <option 
                v-for="subcategory in subcategories" 
                :key="subcategory.id" 
                :value="subcategory.id"
            >
            {{subcategory.title}}
            </option>
        </select>
        <div class="input-group">
            <input class="form-control" name="keyword" type="search" placeholder="Search" v-model="keyword">
            <button class="btn btn-outline-primary" type="button" @click="search"><i class="bi bi-search"></i></button>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
    export default {
        data() {
            return {
                selectedCategory: '0',
                selectedSubCategory :'0',
                keyword: '',
            }
        },
        props: {
            categories: {
                type: Array, 
                default: []
            },
            subcategories: {
                type: Array,
                default: [
                    {id:'',title:''}
                ]
            }
        },
        methods: {
            changeSubcategory() {
                this.$emit('changeSubcategory',this.selectedCategory);
            },
            search(){
                this.$emit('search',this.keyword,this.selectedSubCategory);
            },
            
        },
        watch:{
            keyword:debounce(function(){
                 this.$emit('search',this.keyword);
            },500)
        },
    }
</script>

<style lang="scss" scoped>

</style>