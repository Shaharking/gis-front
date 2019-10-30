<template>
    <div style="padding: 16px">
        <div>
            <h1>Trip offers</h1>
        </div>
        <div>
            <div v-for="offer in offers" :key="offer.user_id" 
                style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(227,227, 227, 0.3); padding-bottom: 8px;">
                <span> {{offer.User.email}} </span>
                <span> {{offer.estimation_cost }} ILS </span>
                <button @click="submit(offer.user_id)" class="btn btn-primary"> Accept </button>
            </div>
        </div>
        <div style="margin-top: 8px;">
            <button class="btn btn-light" @click="close"> Close </button>
        </div>
    </div>    
</template>

<script>
export default {
    props: ["offers"],
    methods: 
    {
        submit (id)
        {
            this.$parent.$emit('submit', id);
            this.$emit('close');
        },
        close ()
        {
          this.$emit('close');   
        }
    }
}
</script>

<style scoped>

</style>
