export default async function ({ $auth, redirect }) {
 if($auth.loggedIn) {
    if($auth.user.full_name){
     redirect('/')
    }
  }
}
