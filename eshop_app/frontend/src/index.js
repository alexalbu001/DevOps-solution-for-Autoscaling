import HomeScreen from './srceens/HomeScreen.js';
import ProductScreen from './srceens/ProductScreen.js';
import { parseRequestUrl } from './utils';
import Error404Screen from './srceens/Error404Screen.js';
import CartScreen from './srceens/CartScreen.js';
import SigninScreen from './srceens/SigninScreen.js';
import RegisterScreen from './srceens/RegisterScreen.js';
import { getUserInfo } from './localStorage.js';
import { isUserSignedIn } from './api';
import ShippingScreen from './srceens/ShippingScreen.js';
import PaymentScreen from './srceens/PaymentScreen.js';
import PlaceOrderScreen from './srceens/PlaceOrderScreen.js';



const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
};
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  await screen.after_render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

