<template>
    <div class="full-height">
        Register
        <p> {{title}}</p>
        <h1 :class="classname">blabla</h1>

        First Name <input id="input" type ="text">
        <button id ="button"> add name</button>
        <button title='this button f'>map.png</button>
        <img alt ="bbb" >
        <img :src="headImg">
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:'abc',
            classname:'color-red',
             headImg: require("../assets/headpart.jpg")
        }
    }
    
}
</script>

<style scoped>
.color-red {color:red};

</style>

