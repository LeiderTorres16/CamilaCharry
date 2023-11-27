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


let HostVenta="http://localhost:4001/ventas"
export const ventasEnvironment = {
  crearVenta: `${HostVenta}/createVenta`
}

let HostAuth="http://localhost:3001/"
export const authEnviorment = {
  registro: `${HostAuth}auth/signup`,
  login: `${HostAuth}auth/login`,
  getUser: `${HostAuth}`
}

let HostPrenda="http://localhost:4000/prendas"
export const prendaEnvironment = {
 crearPrenda: `${HostPrenda}/createPrenda`,
 updatePrenda: `${HostPrenda}/updatePrenda/`,
 getPrendas: `${HostPrenda}/getPrendas`
};

let HostBanner="http://localhost:4002/banner"
export const bannerEnvironment = {
  crearBanner: `${HostBanner}/createBanner`,
  updateBanner: `${HostBanner}/updateBanner/`,
  getBanners: `${HostBanner}/getBanner`,
  getBannerById: `${HostBanner}/getBannerById/`
 };

 
let HostImagen="http://localhost:3000/image"
export const imagenEnvironment = {
  cargarImagenes: `${HostImagen}/uploads`
}
