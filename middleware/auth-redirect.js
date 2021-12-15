export default async function ({ $auth, route, redirect, store, $cookiz }) {
  if (!$auth.loggedIn) {
    const REDIRECT_URL = '/auth'
    // const REDIRECT_URL = '/auth?redirect=' + route.path
    // store.dispatch('snackbar/setSnackbar', { color: 'error', text: "You must be logged in to view that page." })
    $auth.logout();
    redirect(REDIRECT_URL)
  } else if ($auth.loggedIn) {
   
  }
}
