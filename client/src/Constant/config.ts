const env = process.env.REACT_APP_APP_ENV;
const commonConfig = {
  webName: "trainedguide.com",
  address: "No.125/ B, Hithgoda ,Wettewa, Galagedara , Sri lanka.",
  mobile: "+94717798841",
  email: "info@trainedguide.com",
  whatsapp: "+94717798841",
  devsSite: "https://taprodev.com/",
  noImage: "No_Image_Available.jpg",
};

const baseDomainProd = window.location.hostname.includes("www")
  ? "https://www.trainedguide.com"
  : "https://trainedguide.com";

const baseDomainQa = "https://chefbysakura.taprodevpos.com";

const environments = {
  development: {
    webLink: "http://localhost:3000",
    server: "http://localhost/erp/erp-app-be",
    serverapi: "http://localhost/erp/erp-app-be/server/Api",
    imagepath: "http://localhost/erp/erp-app-be/image",
  },
  qa: {
    webLink: `${baseDomainQa}`,
    server: `${baseDomainQa}/server`,
    serverapi: `${baseDomainQa}/server/Api`,
    imagepath: `${baseDomainQa}/image`,
  },
  production: {
    webLink: `${baseDomainProd}`,
    server: `${baseDomainProd}/server`,
    serverapi: `${baseDomainProd}/server/Api`,
    imagepath: `${baseDomainProd}/image`,
  },
};

// Merge common configuration with environment-specific configuration
const config = {
  ...commonConfig,
  ...environments[env],

  // Web routes
  login: "/",
  loginSuccess:"login-success",
  dashboard:"view_dashboard",
  pos:"pos",
  usermanage:"usermanage",
  productmanage:"add_product",
  productpurchase:"edit_product",
  ordermanage:"create_sales_order",

  //commons
  appLogo: "applogo.jpg",
  signInBg: "signInBg.jpeg",
};

export default config;
