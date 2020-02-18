const authenticateUser = (e) => {
  e.preventDefault();
  console.log("JS Event: Auth User");

  const uname = document.getElementById('username').value;
  const passwd = document.getElementById('password').value;
  const options = {
    method: 'POST',
    body: JSON.stringify({ uname, passwd }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }

  const divSignInError = document.getElementById('divSignInError');

  fetch('/sign-in', options)
    .then(res => res.json())
    .then (({ authResponse }) => {
      if (!authResponse) {
        console.log("Failed to get an auth result.");
      } else {
        if (authResponse.resultCode === 0) {
          console.log("AuthN success");
        } else {
          console.log("AuthN failed.");
        }
      }
    })
    .catch(err => {
      console.log(err);
      divSignInError.innerHTML = 'Something went wrong and I could not authenticate you. \'tsek! ;-)';
    })
}

document.getElementById('signInForm').addEventListener('submit', authenticateUser);
  