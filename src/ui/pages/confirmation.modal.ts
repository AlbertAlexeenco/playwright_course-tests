import { expect } from "fixtures";
import { BaseModal } from "./base.modal";
import { log } from "console";
import { logStep } from "utils/report/logStep.utils";

export class ConfirmationModal extends BaseModal {
  readonly uniqueElement = this.page.locator('[name="confirmation-modal"]');

  readonly title = this.uniqueElement.locator("h5");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  @logStep("Click Close btn on Confirmation modal")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Click Cancel btn on Confirmation modal")
  async clickCancel() {
    await this.cancelButton.click();
    await expect(this.uniqueElement).toBeVisible()
  }

  @logStep("Click Confirm btn on Confirmation modal")
  async clickConfirm() {
    await this.confirmButton.click();
  }

  @logStep("Verify Confirmation modal is closed")
  async modalIsClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}