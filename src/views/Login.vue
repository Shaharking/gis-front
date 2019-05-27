<template>
    <div class="full-height">
        

 <div id="Login">




        <div class="Username"> <h1>LOGIN:</h1> </div>

        <div><h2><input class="textInput" placeholder="Username"> </h2> </div>

        <div><h2> <input  class="textInput" placeholder="Password">  </h2> </div>

        <v-ons-button modifier="large" style="margin: 6px 0">LOGIN</v-ons-button>

        <div class="Username"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png" width="25px" height="25px" align="left"><button width="100px"> <h5>Login with Facebook</h5></button></div>

        <div class="Username"><img src="https://herevde.net/wp-content/uploads/2018/06/google-g-logo.jpg" width="25px" height="25px" align="left"><button width="100px"> <h5>Login with Google</h5></button></div>


        </div>
 

     </div>
    
</template>

<script>
export default {
    data ()
    {
        return {
            name: ''
        }
    }
}
</script>

<style scoped>
#Login {

                color:#251d1d;
                width:400px;   
                margin: 0 auto;
                margin-top: 250px;
                


}

.Username{

    padding: 8px;
    display: flex;
    margin-left: 80px;
}

.textInput{

    padding: 8px;
    display: flex;
    width: 380px;
    height: 20px;
    margin: 0px 0px 5px 0px;
}

p{

    font-family: Arial, Helvetica, sans-serif;
}

</style>