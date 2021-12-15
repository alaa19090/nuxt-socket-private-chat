export default async function ({ $auth, redirect, $cookiz }) {
 if ($auth.loggedIn) {
      redirect('/')
  }
}
