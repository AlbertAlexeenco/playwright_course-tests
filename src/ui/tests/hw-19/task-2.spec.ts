import test, { expect } from "@playwright/test";
import { LargeNumberLike } from "crypto";

// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

interface IUser {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    country: string;
    gender: Gender;
    hobbies: Hobbies[];
    language: string;
    skills: Skills;
    yearBirth: string;
    monthBirth: string;
    dayBirth: string;
    password: string;
}

type Skills = "JavaScript" | "Python" | "Java" | "C++" | "Rubby";

type Hobbies = "Travelling"| "Movies" | "Sports" | "Gaming" | "Dancing";

type Gender = "Male" | "Female";

const userInfo:IUser  = {
    firstName: "Alick",
    lastName: "Alex",
    address: "Ciocana, Chisinau",
    email: "Googoosya21@gmail.com",
    phone: "+37378781407",
    country: "UK",
    gender: "Male",
    hobbies: ["Travelling" , "Sports"],
    language: "EN, RO, RU",
    skills: "JavaScript",
    yearBirth: "1993",
    monthBirth: "September",
    dayBirth: "11",
    password: "Password!123",
}

test.describe("", () => {

    test("Submit registration form with valid credentials", async ({ page })=>{

    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const registerPageTitle = page.locator("h2.text-center");
    const firstNameInput = page.locator("#firstName");
    const lastNameInput = page.locator("#lastName");
    const addressInput = page.locator("#address");
    const emailInput = page.locator("#email");
    const phoneInput = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const genderMale = page.locator(`[value="male"][name="gender"]`);
    const genderFemale = page.locator(`[value="female"][name="gender"]`);
    const hobbiesTravelling = page.locator(`[value="Travelling"][class="hobby"]`);
    const hobbiesSports = page.locator(`[value="Sports"][class="hobby"]`);
    const languagesInput = page.locator("#language");
    const skillsSelection = page.locator("#skills");
    const birthYearDropdown = page.locator("#year");
    const birthMonthDropdown = page.locator("#month");
    const birthDayDropdown = page.locator("#day");
    const passwordInput = page.locator("#password");
    const passwordConfirmInput = page.locator("#password-confirm");
    const submitBtn = page.locator(`button[type="submit"]`);
    const registerDetailsPageTitle = page.locator("h2.text-center");

    await page.goto(url);
    await expect(registerPageTitle).toHaveText("Register");
    await firstNameInput.fill(userInfo.firstName);
    await lastNameInput.fill(userInfo.lastName);
    await addressInput.fill(userInfo.address);
    await emailInput.fill(userInfo.email);
    await phoneInput.fill(userInfo.phone);
    await countryDropdown.selectOption(userInfo.country);
    await expect(countryDropdown).toHaveValue(userInfo.country);

    if(userInfo.gender === "Male"){
        await genderMale.check();
        await expect(genderMale).toBeChecked();
    } else if (userInfo.gender === "Female"){
        await genderFemale.check();
        await expect(genderFemale).toBeChecked();
    }
    
    await hobbiesTravelling.check();
    await expect(hobbiesTravelling).toBeChecked();
    await hobbiesSports.check();
    await expect(hobbiesSports).toBeChecked();
    await languagesInput.fill(userInfo.language);
    await skillsSelection.selectOption(userInfo.skills.toString());
    await expect(skillsSelection).toHaveValue(userInfo.skills.toString());
    await birthYearDropdown.selectOption(userInfo.yearBirth);
    await expect(birthYearDropdown).toHaveValue(userInfo.yearBirth);
    await birthMonthDropdown.selectOption(userInfo.monthBirth);
    await expect(birthMonthDropdown).toHaveValue(userInfo.monthBirth);
    await birthDayDropdown.selectOption(userInfo.dayBirth);
    await expect(birthDayDropdown).toHaveValue(userInfo.dayBirth);
    await passwordInput.fill(userInfo.password);
    await passwordConfirmInput.fill(userInfo.password);
    await submitBtn.click();

    await expect(registerDetailsPageTitle).toHaveText("Registration Details");
    })
})