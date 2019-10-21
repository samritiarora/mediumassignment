<template>
  <div name="login">
    <h1 style="margin-left:-8%">Sign In</h1>
    <br>
    <LoggIn/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoggIn from "@/components/LoggIn.vue";

export default {
  name: "Login",
  components: {
    LoggIn
  }
};
</script>


