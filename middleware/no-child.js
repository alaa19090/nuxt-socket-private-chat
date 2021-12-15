export default async function ({ redirect, $cookiz }) {
  //working with cookies because the store don't respond in the real time
  if (!$cookiz.get('current-child-id')) {
    redirect('/no-child')
  }
}
