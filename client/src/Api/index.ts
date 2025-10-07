//user/employee managment endpoint
export * from "./Users/user-sign-in";
export * from "./Users/get-user-role-base-on-users-role";
export * from "./Users/add-new-employee";
export * from "./Users/get-employee-list-base-on-users-role";
export * from "./Users/get-all-features";
export * from "./Users/manage-system-user";
export * from "./Users/get-employee-base-on-users-role-and-name";

//Products/product managment endpoint
export * from "./Product/manage-products";
export * from "./Product/get-agency-all-product";
export * from "./Product/get-agency-product-by-name";
export * from "./Product/get-all-product-by-name";

//Purchasing / Product prurchasing and order managing endponts
export * from "./Purchasing/admin-product-purchasing";
export * from "./Purchasing/get-all-purchase-list";
export * from "./Purchasing/add-new-order";
export * from "./Purchasing/get-agency-all-order-request-list";
export * from "./Purchasing/get-agency-order-request-by-orderid";
export * from "./Purchasing/get-order-item-list-by-order-id";
