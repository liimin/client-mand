export default{
  name: 'TempleMixin',
  beforeMount() {
    if (!this.$config) {
      this.$router.push('/')
    }
  }
}
