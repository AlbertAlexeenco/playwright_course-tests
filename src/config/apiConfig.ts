import { SALES_PORTAL_API_URL } from "./env";

export const apiConfig = {
  baseURL: SALES_PORTAL_API_URL,
  endpoints: {
    products: "/api/products",
    productById: (id: string) => `/api/products/${id}/`,
    customers: "/api/customers",
    customerById: (id: string) => `/api/customers/${id}/`,
    productsAll: "/api/products/all",
    login: "/api/login",
    metrics: "/api/metrics",
  },
};