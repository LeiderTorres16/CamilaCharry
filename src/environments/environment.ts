export const environment = {
  firebase: {
    projectId: 'camilacharrydesigner-ec53b',
    appId: '1:513047775046:web:d1b5c777790777079c0747',
    storageBucket: 'camilacharrydesigner-ec53b.appspot.com',
    apiKey: 'AIzaSyAEZ0YUns9ylw8OxaY6VoBX5ltyondtcug',
    authDomain: 'camilacharrydesigner-ec53b.firebaseapp.com',
    messagingSenderId: '513047775046',
    measurementId: 'G-JG5XS6NMP8',
  },
};


let HostVenta="https://ventas.camilacharry.xyz:8081/ventas"
export const ventasEnvironment = {
  crearVenta: `${HostVenta}/createVenta`,
  getVentas: `${HostVenta}/getVentas`
}

let HostEmail="https://ventas.camilacharry.xyz:8081/email"
export const emailEnvironment = {
  sendEmail: `${HostEmail}/sendPurchaseNotification`
}

let HostAuth="https://auth.camilacharry.xyz:8080/"
export const authEnviorment = {
  registro: `${HostAuth}auth/signup`,
  login: `${HostAuth}auth/login`,
  getUser: `${HostAuth}`
}

let HostPrenda="https://camilacharry.xyz/prendas"
export const prendaEnvironment = {
 crearPrenda: `${HostPrenda}/createPrenda`,
 updatePrenda: `${HostPrenda}/updatePrenda/`,
 getPrendas: `${HostPrenda}/getPrendas`
};

let HostBanner="https://banner.camilacharry.xyz:8083/banner"
export const bannerEnvironment = {
  crearBanner: `${HostBanner}/createBanner`,
  updateBanner: `${HostBanner}/updateBanner/`,
  getBanners: `${HostBanner}/getBanner`,
  getBannerById: `${HostBanner}/getBannerById/`,
  borrarBanner:  `${HostBanner}/delete/`
 };

 
let HostImagen="https://imagen.camilacharry.xyz:8082/image"
export const imagenEnvironment = {
  cargarImagenes: `${HostImagen}/uploads`
}
