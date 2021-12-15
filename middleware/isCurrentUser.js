export default async function({$auth, redirect, store}) {
  if(this.$route.query.user_id == this.$auth.user.user_id) {
    // let the user in
  } else {
    store.dispatch('snackbar/setSnackbar', {color: 'error', text: "You must be an admin to view that page."})
    redirect('/')
  }
}
