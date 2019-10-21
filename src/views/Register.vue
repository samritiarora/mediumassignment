<template>
<div>
  <h1 style="margin-left:-8%">Register</h1><br>
  <SignUp/>
</div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'Register',
  components: {
    SignUp
  }
}
</script>


