import { SalesPortalPage } from "../salesPortal.page";
import { IProductInTableRow } from "data/types/product.types";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

  readonly firstRowLocator = this.page.locator("table tbody>tr:first-child");
  readonly firstRowCellsLocator = this.firstRowLocator.locator("td")
    .filter({hasNot: this.page.locator("button")});

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getFirstRowProduct() : Promise<IProductInTableRow>{
    const [name, price, manufacturer, createdOn] = await this.firstRowCellsLocator.allInnerTexts(); 
    
    return {
      name: name!,
      price: +price!.replace(/\D/g, ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn: createdOn!
    }
  }

}