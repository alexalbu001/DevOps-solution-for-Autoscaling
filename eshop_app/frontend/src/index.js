import HomeScreen from './srceens/HomeScreen.js';
import ProductScreen from './srceens/ProductScreen';
import { parseRequestUrl } from './utils';
import Error404Screen from './srceens/Error404Screen';
import CartScreen from './srceens/CartScreen';
import SigninScreen from './srceens/SigninScreen';
import RegisterScreen from './srceens/RegisterScreen';
import { getUserInfo } from './localStorage';
import { isUserSignedIn } from './api';
import ShippingScreen from './srceens/ShippingScreen';
import PaymentScreen from './srceens/PaymentScreen';
import PlaceOrderScreen from './srceens/PlaceOrderScreen';



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
  try{
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) {
    await screen.after_render();
  } else {
    console.error(`Screen component for ${parseUrl} does not implement after_render`);
  }
} catch (error) {
  console.error(`Error rendering screen for ${parseUrl}`, error);
  }
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

