<template>
    <div>
        <select :name="name" class="form-select" v-model="selectedCategoryId" aria-label="Default select example" @change="changeSubcategory">
            <option value="0">Select Category</option>
            <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
            >
            {{category.title}}
            </option>
        </select>
        <div :class="{'text-sm text-danger':errors[name]}" v-if="errors[name]">{{errors[name][0]}}</div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedCategoryId: this.selectedCategory,
                // selectedSubCategory :'0',
            }
        },
        props: {
            categories: {
                type: Array, 
            },
            name: {
                default : ''
            },
            errors:{
            },
            selectedCategory: {
                default : '0'
            }
        },
        methods: {
            changeSubcategory() {
                this.$emit('changeSubcategory',this.selectedCategoryId);
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>