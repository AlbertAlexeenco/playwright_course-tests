import { expect } from "fixtures";
import { BaseModal } from "./base.modal";

export class ConfirmationModal extends BaseModal {
  readonly uniqueElement = this.page.locator('[name="confirmation-modal"]');

  readonly title = this.uniqueElement.locator("h5");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
    await expect(this.uniqueElement).toBeVisible()
  }

  async clickConfirm() {
    await this.confirmButton.click();
  }

  async modalIsClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}