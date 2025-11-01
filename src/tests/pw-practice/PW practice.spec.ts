import { expect, Page, test } from "@playwright/test";

interface ICardData {
  name: string;
  price: number;
  amount: number;
}
const desiredProducts: ICardData[] = [
  {
    name: "Product 2",
    price: 200,
    amount: 1,
  },
  {
    name: "Product 4",
    price: 750,
    amount: 1,
  },
  {
    name: "Product 6",
    price: 1200,
    amount: 1,
  },
  {
    name: "Product 8",
    price: 1500,
    amount: 1,
  },
  {
    name: "Product 10",
    price: 2000,
    amount: 1,
  },
];

interface IPromocode {
  name: string;
  rebate: number;
}
const promocodes: IPromocode[] = [
  { name: "10-PERCENT-FOR-REDEEM", rebate: 10 },
  { name: "NO-PYTHON", rebate: 8 },
  { name: "JAVA-FOR-BOOMERS", rebate: 7 },
  { name: "5-PERCENT-FOR-UTILS", rebate: 5 },
  { name: "HOT-COURSE", rebate: 10 },
  { name: "15-PERCENT-FOR-CSS", rebate: 15 },
  { name: "HelloThere", rebate: 20 },
];


test.describe("[Demo Shopping Cart]", () => {
    test("E2E", async ({ page }) => {
    /*
    https://anatoly-karpovich.github.io/demo-shopping-cart/
  - добавить продукты 2,4,6,8,10 !
  - завалидировать бейдж с количеством !
  - открыть чекаут !
  - завалидировать сумму и продукты !
  - ввести все найденные вами промокоды (вспоминаем первую лекцию) !
  - завалидировать конечную сумму !
  - зачекаутиться
  - завалидировать сумму
  */

    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    const desiredProductNames = desiredProducts.map((p) => p.name);


    const cartBadge = page.locator("#badge-number");
    const shoppingCard = page.locator("#shopping-cart-btn");
    const checkoutTitle = page.locator("span.text-primary");

    await addProducts(page, desiredProductNames);
    await expect(cartBadge).toHaveText(desiredProducts.length.toString());

    await shoppingCard.click();
    await expect(checkoutTitle).toBeVisible();

    const expectedTotalPrice = desiredProducts.reduce((sum , {price}) => sum + price ,0);
    const totalPriceLabel = page.locator("#total-price");

    await expect(totalPriceLabel,`Should have ${expectedTotalPrice} in total price`).toHaveText(`$${expectedTotalPrice.toFixed(2)}`);

    const actualProductsInCart = await getCardsData(page, desiredProductNames);

    desiredProducts.forEach((product, i) => expect(product).toEqual(actualProductsInCart[i]));

    await applyPromocodes(page, promocodes);

    const appliedPromocodes = await getAppliedPromocodes(page);
    promocodes.forEach((code, i) => expect(code).toEqual(appliedPromocodes[i]))
    
    const fullRebate = appliedPromocodes.reduce((sum, {rebate}) => sum + rebate , 0) / 100;
    console.log(fullRebate);
    const totalPriceWithPromocodes = expectedTotalPrice * (1 - fullRebate);
    console.log(totalPriceWithPromocodes);
    const totalRebate = expectedTotalPrice * fullRebate;
    console.log(totalRebate);  

    await expect(totalPriceLabel).toHaveText(`$${totalPriceWithPromocodes.toFixed(2)} (-$${totalRebate.toFixed(1)})`);

    const checkoutBtn = page.locator("#continue-to-checkout-button");
    await checkoutBtn.click();

    const finalCheckoutTitle = page.locator("h4 span.text-primary");
    const finalCheckoutSum = page.locator("span.text-muted");
    const finalCheckoutBadge = page.locator("h4 span.badge");

    await expect(finalCheckoutTitle).toHaveText("Checkout");
    await expect(finalCheckoutSum).toHaveText(`$${totalPriceWithPromocodes.toFixed(2)}`);
    await expect(finalCheckoutBadge).toHaveText(desiredProducts.length.toString());
    await expect(cartBadge).toHaveText("0");
})
})

function addProductToCard(page:Page, productName:string) {  
    // const cardBody = page.locator(".card-body");
    // const productCardBody = cardBody.filter({has: page.locator(".card-title", { hasText: name}) });
    // const addToCardBtnProduct = productCardBody.getByRole("button", {name: "Add to card"});

    return page
        .locator(".card-body")
        .filter({has: page.locator(".card-title", { hasText: productName}) })
        .getByRole("button", {name: "Add to card"});
}

async function addProducts(page: Page, productNames: string[]){
    for (const productName of productNames){
        await addProductToCard(page, productName).click()
    } 
} 

function productCardByName (page:Page, productName: string){
    const productCardInCheckout = page.locator("li>div[data-product-id]");

    return productCardInCheckout.filter({has: page.locator("h5", {hasText: productName}) });
}

async function getCardDataInCheckout(page: Page, productName: string):Promise <ICardData>{
    const card = productCardByName(page, productName);

    const titleLabel =  card.locator("h5");
    const amountLabel =  card.locator(`span[data-id="product-amount-in-shopping-cart"]`);
    const priceLabel =  card.locator(`span.text-muted`);

    const [name, price, amount] = await Promise.all([titleLabel, priceLabel, amountLabel]
      .map((el) => el.innerText()));
        return {
            name: name!,
            price: +price!.replace("$", ""),
            amount: +amount!,
    };
}

async function getCardsData(page: Page, productNames: string[]):Promise <ICardData[]> {
    return await Promise.all(productNames.map(name => getCardDataInCheckout(page, name) ))
}

async function enterPromocodes(page:Page, promocode:IPromocode) {
    const promoCodeField = page.locator("#rebate-input");
    const redeemBtn = page.locator("#apply-promocode-button");
    const spinner = page.locator(".spinner-border"); 

    await promoCodeField.fill(promocode.name);
    await redeemBtn.click();
    await waitForSpinner(page);
}

async function waitForSpinner(page:Page) {
    const spinner = page.locator(".spinner-border");
    await expect(spinner).not.toBeVisible();
}

async function applyPromocodes(page:Page, promocodes: IPromocode[] ) {
    for(const code of promocodes){
        await enterPromocodes(page, code);
    }
}

async function getAppliedPromocodes(page:Page): Promise<IPromocode[]> {
    const appliedPromocodeItem = await page.locator("#rebates-list li").all();

    const results : IPromocode[] = [];

    for (const item of appliedPromocodeItem){
        const namePromocode = item.locator('span');
        const amountPromocode = item.locator('small');

        const [name, amount] = await Promise.all([namePromocode, amountPromocode].map((el) => el.innerText()));
    
        results.push({ name: name!, rebate: +amount!.replaceAll(/[-%]/g, "")})
    }
    return results;
}

