const register = (e) => {
    e.preventDefault();

    const resultRegister = document.getElementById('resultRegister');
    resultRegister.innerHTML = "Processing...";

    const name = document.getElementById('register_name').value;
    const familyName = document.getElementById('register_familyName').value;
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, familyName, email , password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }

    fetch('/auth/register', options)
      .then(res => res.json())
      .then (({ authResponse }) => {
        if (!authResponse) {
          resultRegister.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultRegister.innerHTML = "Result: Thanks for registering!";
          } else {
            resultRegister.innerHTML = "Result: Sorry your registration failed. Try again later.";
          }
          console.log(authResponse);
        }
      })
      .catch(err => {
        resultRegister.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitRegister').addEventListener('click', register);

const signIn = (e) => {
    e.preventDefault();
  
    const resultLogin = document.getElementById('resultLogin');
    resultLogin.innerHTML = "Processing...";

    const email = document.getElementById('signin_email').value;
    const password = document.getElementById('signin_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    fetch('/auth/login', options)
      .then(res => res.json())
      .then (({ authResponse }) => {
        if (!authResponse) {
          resultLogin.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultLogin.innerHTML = "Result: You're signed in. Welcome!";
          } else {
            resultLogin.innerHTML = "Result: Invalid username or password.";
          }
        }
      })
      .catch(err => {
        console.log(err);
        resultLogin.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitLogin').addEventListener('click', signIn);

const validateToken = (e) => {
    e.preventDefault();
    
    const resultValidateToken = document.getElementById('resultValidateToken');
    resultValidateToken.innerHTML = "Processing...";

    const token = document.getElementById('validatetoken_token').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }

    fetch('/auth/validate', options)
      .then(res => res.json())
      .then (({ authResponse }) => {
        if (!authResponse) {
          resultValidateToken.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultValidateToken.innerHTML = "Result: Token is valid.";
          } else {
            resultValidateToken.innerHTML = "Result: Token is invalid.";
          }
        }
      })
      .catch(err => {
        console.log(err);
        resultValidateToken.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitValidateToken').addEventListener('click', validateToken);