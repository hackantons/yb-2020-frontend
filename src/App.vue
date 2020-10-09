<template>
  <div class="w-10/12 mx-auto mt-2" id="app">
    <img class="max-w-md mb-4" alt="BEKB logo" src="./assets/logo.svg" />
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form
  }
};
</script>
