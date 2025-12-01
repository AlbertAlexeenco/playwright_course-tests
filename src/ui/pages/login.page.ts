import { logStep } from "utils/report/logStep.utils";
import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";

export class LoginPage extends SalesPortalPage{
    readonly loginBtn = this.page.locator(`button[type ="submit"]`);
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput")
    readonly uniqueElement = this.loginBtn;
    
    @logStep("Fill login credentials on Login page")
    async fillCredentials(credentials: Partial<ICredentials>){
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);
    }

    @logStep("Click Login btn on Login page")
    async clickLoginBtn(){
        await this.loginBtn.click();
    }
}