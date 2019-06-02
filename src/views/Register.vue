<template>
    <div class="full-height" >
         
    
        <div  style="width:400px;margin:0 auto;">
            <h1 :class="classname" >Welcome </h1>
            <section>
        
            <input type="radio" v-model="gender" v-bind="a" >{{a}}
            <input type="radio" v-model="gender" v-bind="b" style="margin-left: 30px">{{b}}
            </section>



            <div><input id="input" type ="text" placeholder="First Name " style="margin-top: 10px"></div>

            <div><input id="input" type = "text" placeholder="Second Name" style="margin-top: 10px" ></div>

             <div><input id="input" type = "text" placeholder="Email" style="margin-top: 10px" ></div>

              <div><input id="input" type = "text" placeholder="Password" style="margin-top: 10px" ></div>
            
            <v-ons-button modifier="small" style="margin-left: 50px; margin-top: 10px">Register</v-ons-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           // title:'abc',
            classname:'color-red',
            a:'Company',
            b: 'Privet User',
           
            
            // headImg: require("../assets/headpart.jpg")
           // link: <label for= "company"><input id="company" type="radio" name ="You are?"> company </label><label>for= "company"><input id="Privet" type="radio" name ="You are?"> Privet </label>
        }
    }
    
}
</script>

<style scoped>

.color-red {color:red};
 



</style>

