import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";

export class LoginPage extends SalesPortalPage{
    readonly loginBtn = this.page.locator(`button[type ="submit"]`);
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput")
    readonly uniqueElement = this.loginBtn;
    
    async fillCredentials(credentials: Partial<ICredentials>){
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);
    }

    async clickLoginBtn(){
        await this.loginBtn.click();
    }
}