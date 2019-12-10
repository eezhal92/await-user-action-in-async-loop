<template>
  <div id="app">
    <h3>Existing Phrases</h3>
    <div v-for="p in EXISTING_PHRASES" :key="p">
      {{ p }}
    </div>

    <hr>

    <AddBulkPhrases @submit="handlePhrasesSubmit" />

    <v-dialog />
  </div>
</template>

<script>
import AddBulkPhrases from './components/AddBulkPhrases.vue'
import { EXISTING_PHRASES, createPhrase, testSimilarPhrases } from './services/phrases';

export default {
  name: 'app',
  
  components: {
    AddBulkPhrases
  },

  data () {
    return {
      EXISTING_PHRASES,
      isConflictModalShowing: false,
    };
  },

  methods: {
    getUserInput (phrases, onAdd, onCancel = () => {}) {
      const vm = this;
      const text = 'Conflict with these phrases: ' + phrases.join(', ');

      this.isConflictModalShowing = true;

      return new Promise((resolve) => {
        this.$modal.show('dialog', {
          title: 'Alert!',
          text,
          buttons: [
            {
              title: 'Force Add',
              handler: async () => {
                this.isConflictModalShowing = false;
                this.$modal.hide('dialog');
                await onAdd()
                resolve()
              }
            },
            {
              title: 'Cancel',
              handler: async () => {
                this.isConflictModalShowing = false;
                this.$modal.hide('dialog');
                await onCancel()
                resolve()
              }
            }
          ]
        })
      });
    },

    async handlePhrasesSubmit (payload) {
      for (let i = 0; i < payload.phrases.length; i += 1) {
        const phrase = payload.phrases[i];
        await this.processPhrase(phrase);
      }
    },

    async processPhrase (phrase) {
      const result = await testSimilarPhrases(phrase);
      console.log('result', result)
      if (!result.unique) {
        await this.getUserInput(
          result.conflicting,
          () => { 
            console.log('Force Add API Call') 
            return createPhrase(phrase)
              .then(() => {
                console.log(phrase, 'force added')
              })
          },
        )
      }
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  margin-top 60px
</style>
