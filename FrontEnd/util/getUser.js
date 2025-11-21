/* 
  getUserDetails() retrieves the logged-in user's information 
  from the browser's localStorage. 

  It looks for the key 'todoAppUser' (which stores user data as a JSON string).
  If found, it parses and returns the user object.
  If not found, it returns null — indicating no user is currently logged in.
*/

export function getUserDetails(){
    let user = localStorage.getItem('todoAppUser')
    return user ? JSON.parse(user) : null
}