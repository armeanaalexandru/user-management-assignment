export const actions = {
  addToastMessage(type, payload) {
    this.$patch({
      toastMessage: {
        payload: payload,
        type: type
      }
    })
  }
}
