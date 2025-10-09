const env = process.env.REACT_APP_APP_ENV;
const commonConfig = {
  webName: "edsy.lk",
  address: "No.125/ B, aladeniya, Sri lanka.",
  mobile: "+94783814075",
  email: "info@edsy.lk",
  whatsapp: "+94783814075",
  devsSite: "https://edsy.lk/",
  noImage: "no_image_available.jpg",
};

const baseDomainLocal = "http://localhost/app/trdv-lms";

const baseDomainProd = window.location.hostname.includes("www")
  ? "https://www.edsy.lk"
  : "https://edsy.lk";

const baseDomainQa = window.location.hostname.includes("www")
  ? "https://www.qa.taprodevpos.com"
  : "https://qa.taprodevpos.com";

const environments = {
  localhost: {
    webLink: `${baseDomainLocal}`,
    server: `${baseDomainLocal}/server`,
    serverapi: `${baseDomainLocal}/server/Api`,
    imagepath: `${baseDomainLocal}/images`,
  },
  development: {
    webLink: `${baseDomainQa}`,
    server: `${baseDomainQa}/server`,
    serverapi: `${baseDomainQa}/server/Api`,
    imagepath: `${baseDomainQa}/images`,
  },
  production: {
    webLink: `${baseDomainProd}`,
    server: `${baseDomainProd}/server`,
    serverapi: `${baseDomainProd}/server/Api`,
    imagepath: `${baseDomainProd}/images`,
  },
};

const config = {
  ...commonConfig,
  ...environments[env],

  // Web routes
  login: "/",
  loginSuccess: "login-success",

  //commons
  appLogo: "applogo.jpg",
  signInBg: "signInBg.jpeg",
};

export default config;
