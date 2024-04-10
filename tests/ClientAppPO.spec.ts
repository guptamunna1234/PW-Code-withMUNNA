import { test, expect } from '@playwright/test';


import { POManager } from '../pageobjects/POManager';
 //Json->string->ts object
//  const dataset =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


 test('@Webs Client App login for', async ({page})=>
 {
   const poManager = new POManager(page);
    //ts file- Login ts, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     const Data = await loginPage.getdatafrompostgrey('select * from useraccess');
     const Usernames = Data.map(row => row.username);
     const Password = Data.map(row => row.pass_word);
     const UsernamesString = Usernames.join(', ');
     const PasswordString = Password.join(', ');
 
 
     await loginPage.validLogin(UsernamesString, PasswordString);

    //  await loginPage.validLogin("anshika@gmail.com","Iamking@000");
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart("ADIDAS ORIGINAL");
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed("ADIDAS ORIGINAL");
    await cartPage.Checkout();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountrycode("Indi");
    await page.keyboard.press('Backspace');
    await ordersReviewPage.searchCountryAndSelect("India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 });


 test('Client App login', async ({page})=>
 {
   const poManager = new POManager(page);
    //tsh file- Login ts, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin("anshika@gmail.com","Iamking@000");
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart("ADIDAS ORIGINAL");
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed("ADIDAS ORIGINAL");
    await cartPage.Checkout();


})

//test files will trigger parallel
//individual tests in the file will run in sequence