// import { signin } from '../api';
// import { getUserInfo, setUserInfo } from '../localStorage';

// const SigninScreen = {
//     after_render: () => {
//       const signinForm = document.getElementById('signin-form');
//       signinForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent the form from submitting normally
        
//         // Perform the sign-in logic
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const data = await signin(email, password);
        
//         // Save user info to local storage if sign-in is successful
//         if (data) {
//           setUserInfo(data);
//           window.location.hash = '/'; // Redirect to the home page
//         }
//       });
//     },
//     render: () => {
//       return `
//       <div class="form-container">
//         <form id="signin-form">
//           <ul class="form-items">
//             <li>
//               <h1>Sign-In</h1>
//             </li>
//             <li>
//               <label for="email">Email</label>
//               <input type="email" name="email" id="email" />
//             </li>
//             <li>
//               <label for="password">Password</label>
//               <input type="password" name="password" id="password" />
//             </li>
//             <li>
//               <button type="submit" class="primary">Sign in</button>
//             </li>
//             <li>
//               <div>
//                 New User?
//                 <a href="/#/register">Create your account</a>
//               </div>
//             </li>
//           </ul>
//         </form>
//       </div>
//       `;
//     },
//   };
  
//   export default SigninScreen;

import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { redirectUser } from '../utils';

const SigninScreen = {
  after_render: async () => {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the form from submitting normally

      // Perform the sign-in logic
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const data = await signin(email, password);

      // Save user info to local storage if sign-in is successful
      if (data) {
        setUserInfo(data);
        // redirectUser();
        window.location.hash = '/'; // Redirect to the home page
      }
    });
  },
  render: () => {
    return `
      <div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign-In</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
            <li>
              <button type="submit" class="primary">Sign in</button>
            </li>
            <li>
              <div>
                New User?
                <a href="/#/register">Create your account</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

export default SigninScreen;
