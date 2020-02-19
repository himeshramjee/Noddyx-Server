const registerHimesh = (e) => {
    e.preventDefault();
  
    const name = document.getElementById('register_name').value;
    const email = document.getElementById('register_email').value;
    const passwd = document.getElementById('register_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name, email, passwd }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const resultRegisterHimesh = document.getElementById('resultRegisterHimesh');
  
    fetch('/auth/register', options)
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
        resultRegisterHimesh.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitRegisterHimesh').addEventListener('submit', registerHimesh);

const signInHimesh = (e) => {
    e.preventDefault();
  
    const email = document.getElementById('signin_email').value;
    const passwd = document.getElementById('signin_password').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, passwd }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const resultLoginHimesh = document.getElementById('resultLoginHimesh');
  
    fetch('/auth/login', options)
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
        resultLoginHimesh.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitLoginHimesh').addEventListener('submit', signInHimesh);



const validateHimeshsToken = (e) => {
    e.preventDefault();
  
    const token = document.getElementById('validatetoken_token').value;
    const options = {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }
  
    const resultValidateHimeshsToken = document.getElementById('resultValidateHimeshsToken');
  
    fetch('/auth/validate', options)
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
        resultValidateHimeshsToken.innerHTML = 'Eina! Error msg: ' + err.message;
      })
  }

document.getElementById('submitValidateHimeshToken').addEventListener('submit', validateHimeshsToken);