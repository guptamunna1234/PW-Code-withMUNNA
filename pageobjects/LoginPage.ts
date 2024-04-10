
import {Page,Locator} from 'playwright';
import { Client } from 'pg';

export class LoginPage {
 
    private page:Page;
    signInbutton:Locator;
    userName:Locator;
    password:Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.signInbutton= page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    
    }
    
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    
    async validLogin(username,password)
    {
        await  this.userName.fill(username);
         await this.password.fill(password);
         await this.signInbutton.click();
         await this.page.waitForLoadState('networkidle');
    
    }
    async getdatafrompostgrey(query)
{
    const client = new Client({
        host: 'localhost', // Replace with your host
        port: 5432, // Replace with your port
        user: 'postgres', // Replace with your username
        password: 'Munna@9955', // Replace with your password
        database: 'postgres', // Replace with your database
      
      });
    
      await client.connect();
      const res = await client.query(query);
      const data = res.rows;
      await client.end();
      return data;

}
    
    }
    module.exports = {LoginPage};
