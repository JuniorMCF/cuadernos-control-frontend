<template>
    <div class="row  content-wrap-0 mx-auto elevation-0">
        <div class="col-12 py-0" style="height:300px">
         
        </div>
        <div class="col-12 text-center py-0">
            <span class="text-h5 font-weight-bold ">NOT FOUND</span>
        </div>
         <div class="col-12 text-center my-4">
             <v-btn link @click="goToHome()" rounded class="mx-auto primary elevation-0 font-weight-bold"  large>
                Go home
             </v-btn>
         </div>
    </div>
</template>

<script>

export default {
    name:'404-component',
    methods: {
        goToHome(){
            this.$router.push({name:"home"})
        }
    }
}
</script>

<style>

</style>
