const registerHimesh = (e) => {
    e.preventDefault();

    const resultRegisterHimesh = document.getElementById('resultRegisterHimesh');
    resultRegisterHimesh.innerHTML = "Processing...";

    const name = document.getElementById('register_name').value;
    const familyName = document.getElementById('register_familyName').value;
    const email = document.getElementById('register_email').value;
    // const passwd = document.getElementById('register_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, familyName, email }), //, passwd }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }

    fetch('/auth/register', options)
      .then(res => res.json())
      .then (({ authResponse }) => {
        if (!authResponse) {
          resultRegisterHimesh.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultRegisterHimesh.innerHTML = "Result: Thanks for registering!";
          } else {
            resultRegisterHimesh.innerHTML = "Result: Sorry your registration failed. Try again later.";
          }
          console.log(authResponse);
        }
      })
      .catch(err => {
        resultRegisterHimesh.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitRegisterHimesh').addEventListener('click', registerHimesh);

const signInHimesh = (e) => {
    e.preventDefault();
  
    const resultLoginHimesh = document.getElementById('resultLoginHimesh');
    resultLoginHimesh.innerHTML = "Processing...";

    const email = document.getElementById('signin_email').value;
    const passwd = document.getElementById('signin_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, passwd }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    fetch('/auth/login', options)
      .then(res => res.json())
      .then (({ authResponse }) => {
        if (!authResponse) {
          resultLoginHimesh.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultLoginHimesh.innerHTML = "Result: You're signed in. Welcome!";
          } else {
            resultLoginHimesh.innerHTML = "Result: Invalid username or password.";
          }
        }
      })
      .catch(err => {
        console.log(err);
        resultLoginHimesh.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitLoginHimesh').addEventListener('click', signInHimesh);

const validateHimeshsToken = (e) => {
    e.preventDefault();
    
    const resultValidateHimeshsToken = document.getElementById('resultValidateHimeshsToken');
    resultValidateHimeshsToken.innerHTML = "Processing...";

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
          resultValidateHimeshsToken.innerHTML = 'No response!? Error msg: ' + err.message;
        } else {
          if (authResponse.resultCode === 0) {
            resultValidateHimeshsToken.innerHTML = "Result: Token is valid.";
          } else {
            resultValidateHimeshsToken.innerHTML = "Result: Token is invalid.";
          }
        }
      })
      .catch(err => {
        console.log(err);
        resultValidateHimeshsToken.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitValidateHimeshToken').addEventListener('click', validateHimeshsToken);