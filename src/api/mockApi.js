import _ from 'lodash';
import axios from 'axios';

const LOGIN_API = 'http://localhost:5000/api/auth/signin';
const PROFILE_API = 'http://localhost:5000/api/me';

export function authenticate(email, password) {
  return new Promise(async (resolve, reject) => {
    // let user = await _.find(users, user => {
    //   return user.email === email;
    // });
    // if (user && user.password === password) {
    //   resolve(Object.assign({}, user));
    // }
    // else
    let funcToBeCalled;
    let dataToBePassed;
    await axios.post(LOGIN_API, {
      email: email,
      password: password
    }).then(async (response)=>{
      dataToBePassed = Object.assign({}, response.data);
      sessionStorage.setItem('accessToken', response.data.accessToken);
      axios.defaults.headers.common['access_token'] = response.data.accessToken;
      let userDetails = await axios.get(PROFILE_API);
      funcToBeCalled = resolve;
      dataToBePassed = userDetails.data;
    }).catch((err)=>{
      funcToBeCalled = reject;
      dataToBePassed = 'Wrong login credentials';
    });
    funcToBeCalled(dataToBePassed);
  });
}