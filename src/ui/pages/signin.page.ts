import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";

export class SignInPage extends SalesPortalPage{
    readonly loginBtn = this.page.locator(`button[type ="submit"]`);
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput")
    readonly uniqueElement = this.loginBtn;
    
    async fillCredentials(credentials: ICredentials){
        await this.emailInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
    }

    async clickLoginBtn(){
        await this.loginBtn.click();
    }
}