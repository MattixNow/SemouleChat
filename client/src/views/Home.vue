<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginStep v-bind:accentColor="usernameChoiced" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import LoginStep from '@/components/LoginStep.vue';

  export default {
    name: 'home',
    props: ['usernameChoiced'],
    components: {
      LoginStep,
    },
    mounted() {
      console.log(this.usernameChoiced)
    }
  };

</script>
