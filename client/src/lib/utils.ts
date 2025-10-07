import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserRoles, UserRolesEnum } from "../Constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const removeHtmlTags = (input: any) => {
  return input?.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
};

export const truncate = (str: string, n: number) => {
  return str?.length > n ? str?.substr(0, n - 1) + "..." : str;
};

export const getCurrentTime = () => {
  const now = new Date();

  // Format the date and time
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Construct the formatted date-time string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const userMainRoleByUserRole = (userRole: UserRoles) => {
  const isAdmin =
    userRole === UserRolesEnum.admin ||
    userRole === UserRolesEnum.head_office_manager ||
    userRole === UserRolesEnum.head_office_accountant;

  const isAgency =
    userRole === UserRolesEnum.agency ||
    userRole === UserRolesEnum.agency_accountant ||
    userRole === UserRolesEnum.agency_manager;

  const isSalesman = !isAdmin && !isAgency;

  return {
    isAdmin,
    isAgency,
    isSalesman,
  };
};
