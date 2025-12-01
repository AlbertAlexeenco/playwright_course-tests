import { IProductInTable, ProductsTableHeader } from "data/types/product.types";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ProductDetailsModal } from "ui/pages/details.modal";
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import { ConfirmationModal } from "ui/pages/confirmation.modal";
import { logStep } from "utils/report/logStep.utils";



export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);
  readonly deleteModal = new ConfirmationModal(this.page);

  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  
  readonly tableRowByName = (productName: string) =>
    this.page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

  readonly firstRowLocator = this.page.locator("table tbody>tr:first-child");
  readonly firstRowCellsLocator = this.firstRowLocator.locator("td")
    .filter({hasNot: this.page.locator("button")});

  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  // readonly createdOnCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(3);
  readonly createdOnCell = (nameOrIndex: string | number) =>
    typeof nameOrIndex === "string"
      ? this.tableRowByName(nameOrIndex).locator("td").nth(3)
      : this.tableRowByIndex(nameOrIndex).locator("td").nth(3);

  readonly tableHeader = this.page.locator("thead th div[current]");
  // readonly nameHeader = this.tableHeader.nth(0);
  readonly tableHeaderNamed = (name: ProductsTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (name: ProductsTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-products");

  readonly uniqueElement = this.addNewProductButton;

  @logStep("Click Add New Product btn on Products List page")
  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  @logStep("Get first row product data from Products List table")
  async getFirstRowProduct() : Promise<IProductInTable>{
    const [name, price, manufacturer, createdOn] = await this.firstRowCellsLocator.allInnerTexts(); 
    
    return {
      name: name!,
      price: +price!.replace(/\D/g, ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn: createdOn!
    }
  }

  @logStep("Get product data from Products List table by product name")
  async getProductData(productName: string): Promise<IProductInTable> {
    //Variant 1
    // return {
    //   name: await this.nameCell(productName).innerText(),
    //   price: +(await this.priceCell(productName).innerText()).replace("$", ""),
    //   manufacturer: (await this.manufacturerCell(productName).innerText()) as MANUFACTURERS,
    //   createdOn: await this.createdOnCell(productName).innerText(),
    // };

    //variant 2
    // const [name, price, manufacturer, createdOn] = await Promise.all([
    //   this.nameCell(productName).textContent(),
    //   this.priceCell(productName).textContent(),
    //   this.manufacturerCell(productName).textContent(),
    //   this.createdOnCell(productName).textContent(),
    // ]);
    // return {
    //   name: name!,
    //   price: +price!.replace("$", ""),
    //   manufacturer: manufacturer! as MANUFACTURERS,
    //   createdOn: createdOn!,
    // };

    //variant 3
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts();
    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }

  @logStep("Get all products data from Products List table")
  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace("$", ""),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!,
      });
    }
    return data;
  }

  @logStep("Click action btn on Products List page")
  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  @logStep("Click table header on Products List page")
  async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  @logStep("Fill search input on Products List page")
   async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  @logStep("Click search btn on Products List page")
  async clickSearch() {
    await this.searchButton.click();
  }
}