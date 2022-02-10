export default async function ({ $auth, route, redirect, store, $cookiz }) {
  if (!$auth.loggedIn) {
    const REDIRECT_URL = '/auth'
   
    redirect(REDIRECT_URL)
  } else if ($auth.loggedIn) {
   
  }
}
