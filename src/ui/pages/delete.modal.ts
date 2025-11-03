import { IProductDetails } from "data/types/product.types";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { SalesPortalPage } from "./salesPortal.page";
import { expect, Locator } from "@playwright/test";

export class ProductDeleteModal extends SalesPortalPage {
  
  readonly modalDialog = this.page.locator(".modal-content");
  readonly title = this.modalDialog.locator("h5");
  readonly closeButton = this.modalDialog.locator("button.btn-close");
  readonly messageBody = this.modalDialog.locator(".modal-body");
  readonly deleteButton = this.modalDialog.locator("button.btn-danger");
  readonly cancelButton = this.modalDialog.locator("button.btn-secondary");
  
  readonly uniqueElement = this.modalDialog;

  async clickClose() {
    await this.closeButton.click();
  }

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
    await expect(this.uniqueElement).toBeVisible()
  }

  async modalIsClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}