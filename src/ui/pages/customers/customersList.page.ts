
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import { ConfirmationModal } from "ui/pages/confirmation.modal";
import { CustomersTableHeader, ICustomerInTable } from "data/types/customers.types";
import { COUNTRIES } from "data/salesPortal/customers/countries";
import { logStep } from "utils/report/logStep.utils";



export class CustomersListPage extends SalesPortalPage {
  readonly deleteModal = new ConfirmationModal(this.page);

  readonly customerPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  
  readonly tableRowByName = (customerName: string) =>
    this.page.locator(`//table/tbody/tr[./td[text()="${customerName}"]]`);

  readonly firstRowLocator = this.page.locator("table tbody>tr:first-child");
  readonly firstRowCellsLocator = this.firstRowLocator.locator("td")
    .filter({hasNot: this.page.locator("button")});

  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly nameCell = (customerName: string) => this.tableRowByName(customerName).locator("td").nth(0);
  readonly priceCell = (customerName: string) => this.tableRowByName(customerName).locator("td").nth(1);
  readonly manufacturerCell = (customerName: string) => this.tableRowByName(customerName).locator("td").nth(2);
  // readonly createdOnCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(3);
  readonly createdOnCell = (nameOrIndex: string | number) =>
    typeof nameOrIndex === "string"
      ? this.tableRowByName(nameOrIndex).locator("td").nth(3)
      : this.tableRowByIndex(nameOrIndex).locator("td").nth(3);

  readonly tableHeader = this.page.locator("thead th div[current]");
  // readonly nameHeader = this.tableHeader.nth(0);
  readonly tableHeaderNamed = (name: CustomersTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (name: CustomersTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (customerName: string) => this.tableRowByName(customerName).getByTitle("Edit");
  readonly detailsButton = (customerName: string) => this.tableRowByName(customerName).getByTitle("Details");
  readonly deleteButton = (customerName: string) => this.tableRowByName(customerName).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-products");

  readonly uniqueElement = this.addNewCustomerButton;

  @logStep("Click Add New Customer btn on Customers List page")
  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  @logStep("Get first row customer data from Customers List table")
  async getFirstRowCustomer() : Promise<ICustomerInTable>{
    const [email, name, country, createdOn] = await this.firstRowCellsLocator.allInnerTexts(); 
    
    return {
      email: email!,
      name: name!,
      country: country as COUNTRIES,
      createdOn: createdOn!
    }
  }
  @logStep("Get customer data from Customers List table")
  async getCustomerData(customerName: string): Promise<ICustomerInTable> {
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
    const [email, name, country, createdOn] = await this.tableRowByName(customerName).locator("td").allInnerTexts();
    return {
      email: email!,
      name: name!,
      country: country as COUNTRIES,
      createdOn: createdOn!
    };
  }
  @logStep("Get all table data from Customers List table")
  async getTableData(): Promise<ICustomerInTable[]> {
    const data: ICustomerInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        email: email!,
      name: name!,
      country: country as COUNTRIES,
      createdOn: createdOn!
      });
    }
    return data;
  }

  @logStep("Click action btn on Customers List table")
  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  @logStep("Click table header on Customers List page")
  async clickTableHeader(name: CustomersTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  @logStep("Fill Search input on Customers List page")
   async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }
  
  @logStep("Click Search btn on Customers List page")
  async clickSearch() {
    await this.searchButton.click();
  }
}