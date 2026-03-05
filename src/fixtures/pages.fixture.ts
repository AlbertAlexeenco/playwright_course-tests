import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { EditProductPage } from "ui/pages/products";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductUIService } from "ui/services/addNewProduct.ui-service";
import { CustomersListUIService } from "ui/services/customers/customersList.ui-service";
import { EditProductUIService } from "ui/services/editProduct.ui-service";
import { HomeUIService } from "ui/services/home.ui-service";
import { LoginUIService } from "ui/services/login.ui-service";
import { ProductsListUIService } from "ui/services/productsList.ui-service";



export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  editProductUIService: EditProductUIService;
  customersListUIService: CustomersListUIService,
  
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
   editProductPage: async ({ page }, use) => {
    await use(new EditProductPage(page));
  },

  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  


   //ui-services
    
  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
  
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  editProductUIService: async ({ page }, use) => {
    await use(new EditProductUIService(page));
  },

  customersListUIService: async ({ page }, use) => {
    await use(new CustomersListUIService(page));
  },

});

// export class Pages {
//   public homePage: HomePage;
//   public productsListPage: ProductsListPage;
//   public addNewProductPage: AddNewProductPage;

//   constructor(page: Page) {
//     this.homePage = new HomePage(page);
//     this.productsListPage = new ProductsListPage(page);
//     this.addNewProductPage = new AddNewProductPage(page);
//   }
// }

// interface IPages {
//   pages: Pages;
// }

// const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect };