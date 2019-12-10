<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="">Phrases</label>
      <br>
      <textarea v-model="textInput" cols="30" rows="2"></textarea>
      <div><small>Separate phrase with comma</small></div>

      <button>Send</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textInput: ''
    }
  },

  methods: {
    handleSubmit () {
      const payload = this.textInput.split(',').map(t => t.trim());

      this.$emit('submit', {
        phrases: payload,
      });
    }
  }
}
</script>