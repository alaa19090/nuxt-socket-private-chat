export default async function ({ $auth, route, redirect, $cookiz }) {
  if (!$auth.loggedIn) {
    redirect('/')
  } else if ($auth.loggedIn) {
    if ($cookiz.get('auth.strategy') == 'google') {
      redirect('/new-user-google')
    }else{
      redirect('/')
    }
  }
}
