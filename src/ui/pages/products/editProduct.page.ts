import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { AddNewProductPage } from "./addNewProduct.page";
import { logStep } from "utils/report/logStep.utils";

export class EditProductPage extends AddNewProductPage {
  readonly saveButton = this.page.locator("#save-product-changes");

  @logStep("Clear all fields on Edit Product page")
  async clearAllFields(){
    await this.nameInput.clear();
    await this.priceInput.clear();
    await this.amountInput.clear();
    await this.notesInput.clear();      
  }
}