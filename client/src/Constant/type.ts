//site users
export type UserRoles = "admin" | "none";

export enum UserRolesEnum {
  admin = "admin",
  none = "none",
}

export enum AppFeature {
  ADD_EMPLOYEE = "add_employee",
  EDIT_EMPLOYEE = "edit_employee",
  DELETE_EMPLOYEE = "delete_employee",
  ADD_USER = "usermanage",
  EDIT_USER = "edit_user",
  ASSIGN_ROLES = "assign_roles",
  ADD_PRODUCT = "add_product",
  EDIT_PRODUCT = "edit_product",
  DELETE_PRODUCT = "delete_product",
  MANAGE_INVENTORY = "manage_inventory",
  SET_PRODUCT_PRICING = "set_product_pricing",
  CREATE_SALES_ORDER = "create_sales_order",
  EDIT_SALES_ORDER = "edit_sales_order",
  VIEW_INVOICES = "view_invoices",
  GENERATE_SALES_REPORTS = "generate_sales_reports",
  CREATE_PURCHASE_ORDER = "create_purchase_order",
  EDIT_PURCHASE_ORDER = "edit_purchase_order",
  APPROVE_PURCHASE_ORDER = "approve_purchase_order",
  VIEW_FINANCIAL_REPORTS = "view_financial_reports",
  MANAGE_EXPENSES = "manage_expenses",
  HANDLE_PAYMENTS = "handle_payments",
  CONFIGURE_TAX = "configure_tax",
  VIEW_LEADS = "view_leads",
  ADD_LEAD = "add_lead",
  CONVERT_LEAD = "convert_lead",
  ASSIGN_SALES_REP = "assign_sales_rep",
  VIEW_DASHBOARD = "view_dashboard",
  EXPORT_DATA = "export_data",
  CUSTOM_REPORT_BUILDER = "custom_report_builder",
  SYSTEM_CONFIG = "system_config",
  MANAGE_API_KEYS = "manage_api_keys",
  ACCESS_LOGS = "access_logs",
  BACKUP_RESTORE = "backup_restore",
}
export interface UserType {
  userId: any;
  user_key_id: string;
  username: string;
  userRole: UserRoles;
  email: string;
}

export enum ProductSearchType {
  ALL_PRODUCTS = "ALL_PRODUCTS",
}
