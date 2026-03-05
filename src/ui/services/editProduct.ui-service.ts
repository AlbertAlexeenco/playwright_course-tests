import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { EditProductPage, ProductsListPage } from "ui/pages/products";

export class EditProductUIService {
    editProductPage: EditProductPage;
    productsListPage: ProductsListPage;

    constructor(private page: Page) {
        this.editProductPage = new EditProductPage(page);
        this.productsListPage = new ProductsListPage(page);
    }

    // async open(ID: string) {
    //     await this.editProductPage.open(`products/${ID}/edit`);
    //     await this.editProductPage.waitForOpened();
    // }

    async open(product: IProduct) {
        //this.productsListPage.tableRowByName(product.name);
        this.productsListPage.clickAction(product.name, "edit");
        await this.editProductPage.waitForOpened();
    }

    async editProductData(productData?: Partial<IProduct>){
        const data = generateProductData(productData);
        await this.editProductPage.clearAllFields();
        await this.editProductPage.fillForm(data);
        const response = await this.editProductPage.interceptResponse<IProductResponse, any>(
              apiConfig.endpoints.products,
              this.editProductPage.clickSave.bind(this.editProductPage),
            );
        expect(response.status).toBe(STATUS_CODES.OK);
        expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);
        
        await this.productsListPage.waitForOpened();
        return response.body.Product;
    }
}

// async create(productData?: Partial<IProduct>) {
//     const data = generateProductData(productData);
//     await this.addNewProductPage.fillForm(data);
//     const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
//       apiConfig.endpoints.products,
//       this.addNewProductPage.clickSave.bind(this.addNewProductPage),
//     );
//     expect(response.status).toBe(STATUS_CODES.CREATED);
//     expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

//     await this.productsListPage.waitForOpened();
//     return response.body.Product;
//   }