
import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";

import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signin.page";


test.describe("[Sales Portal] [Products]", async () => {
  
  test("Add new product", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await signInPage.open();
    await signInPage.fillCredentials(credentials);
    await signInPage.clickLoginBtn();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    const result = await productsListPage.getFirstRowProduct();

    expect(result.name).toEqual(productData.name);
    expect(result.price).toEqual(productData.price);
    expect(result.manufacturer).toEqual(productData.manufacturer);
  });
});
