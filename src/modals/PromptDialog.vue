<template>
    <div class="wrapper">
        <h1 style="text-align: center;">{{ title }} </h1>
        <div style="padding:8px 0">
            <input class="form-control" type="text" :placeholder="placeholder" v-model="val" />
        </div>
        <div style="display: flex; justify-content: space-between;">
            <button class="btn btn-light" @click="close"> Close </button>
            <button class="btn btn-primary" @click="submit"> Submit </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "placeholder", "value"],
    data ()
    {
        return {
            val: undefined
        }
    },
    methods:
    {
        submit ()
        {
            this.$parent.$emit('submit', this.val);
            this.$emit('close');
        },
        close ()
        {
          this.$emit('close');   
        }
    },
    watch:
    {
        value ()
        {
            if (this.value)
            {
                this.val = this.value;
            }
        }
    }
}
</script>


<style scoped>
.wrapper
{
    padding: 16px;
}
</style>
