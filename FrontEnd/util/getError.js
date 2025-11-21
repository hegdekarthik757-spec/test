/* 
  getErrorMessage() safely extracts a readable message from an error object.
  It first checks if the error came from an HTTP response (like Axios),
  and tries to return the message from the server: error.response.data.message.
  If that’s not available, it falls back to error.message or converts
  the entire error object to a string. This ensures a clean, user-friendly
  error message is always returned instead of a raw error object.
*/

export function getErrorMessage(error){
    const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return msg;
}