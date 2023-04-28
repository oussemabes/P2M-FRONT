import { Builder, By, Key, until, WebDriverWait,Select } from "selenium-webdriver"
import { faker } from '@faker-js/faker'

 
describe("Auth", () => {
  describe("Registre", () => {
    let driver;

    beforeEach(async () => {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/register`);
    });
    afterEach(async () => {
      await driver.quit();
    });
   
    it("should login succesfly and navigate to home", async () => {
      let initialUrl = await driver.getCurrentUrl()
      let randomName = faker.name.fullName();
      let randomEmail = faker.internet.email();
      let randomPassword = faker.internet.password();
      const nameinputField = await driver.findElement(By.name("name"));
      await nameinputField.sendKeys(randomName);
      const emailinputField = await driver.findElement(By.name("email"));
      await emailinputField.sendKeys(randomEmail);
      const passwordField = await driver.findElement(By.name("password"));
      await passwordField.sendKeys(randomPassword);
      const confirmpasswordField = await driver.findElement(By.name("confirmPassword"));
      await confirmpasswordField.sendKeys(randomPassword);
      const button = await driver.findElement(By.name("button"));

      await button.click().then();

      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== initialUrl;
      }, 1000);
      const updatedUrl = await driver.getCurrentUrl();

      expect(updatedUrl).toBe(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/login`)

    });

  })

  describe("Log In", () => {
    let driver;
    beforeEach(async () => {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/login`);
    });
    afterEach(async () => {
      await driver.quit();
    });
    it("should login succesfly and navigate to home", async () => {
      let initialUrl = await driver.getCurrentUrl()
      const inputField = await driver.findElement(By.name("email"));
      await inputField.sendKeys("oussema422oussema@gmail.com");
      const button = await driver.findElement(By.name("button"));
      const passwordField = await driver.findElement(By.name("password"));
      await passwordField.sendKeys("123456");
      await button.click().then();

      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== initialUrl;
      }, 1000);
      const updatedUrl = await driver.getCurrentUrl();

      expect(updatedUrl).toBe(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/`)

    });

  })
  describe("Registre and then login", () => {
    let driver;

    beforeEach(async () => {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/register`);
    });
    afterEach(async () => {
      await driver.quit();
    });
    it("should login succesfly and navigate to home", async () => {
      let initialUrl = await driver.getCurrentUrl()
   
      let randomName = faker.name.fullName();   
      let randomEmail = faker.internet.email();
      let randomPassword = faker.internet.password();
      const nameinputField = await driver.findElement(By.name("name"));
      await nameinputField.sendKeys(randomName);
      const emailinputField = await driver.findElement(By.name("email"));
      await emailinputField.sendKeys(randomEmail);
      const registerpasswordField = await driver.findElement(By.name("password"));
      await registerpasswordField.sendKeys(randomPassword);
      const confirmpasswordField = await driver.findElement(By.name("confirmPassword"));
      await confirmpasswordField.sendKeys(randomPassword);
      const registerbutton = await driver.findElement(By.name("button"));
      await registerbutton.click().then();
      await driver.wait(async () => { 
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== initialUrl;
      }, 1000); 
      const updatedUrlforlogin = await driver.getCurrentUrl();

 
      const inputField = await driver.findElement(By.name("email"));
      await inputField.sendKeys(randomEmail);
      const passwordField = await driver.findElement(By.name("password"));
      await passwordField.sendKeys(randomPassword);
      const button = await driver.findElement(By.name("button"));
      await button.click().then();

      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== updatedUrlforlogin;
      }, 3000);
      const updatedUrl = await driver.getCurrentUrl();

      expect(updatedUrl).toBe(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/`)
  });

})})
describe("Porducts", () => {
   describe("User can create auction", () => {
    let driver;

    beforeEach(async () => {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.manage().window().maximize();
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/login`);
    }); 
 
   
    it("should create product succesfly", async () => {

      let initialUrl = await driver.getCurrentUrl()
      const inputField = await driver.findElement(By.name("email"));
      await inputField.sendKeys("oussema422oussema@gmail.com");
      const loginbutton = await driver.findElement(By.name("button"));
      const passwordField = await driver.findElement(By.name("password"));
      await passwordField.sendKeys("123456");
      await loginbutton.click().then();
 
      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== initialUrl;
      }, 1000);

//end login
      const updatedUrl = await driver.getCurrentUrl();

      const navigatebutton = await driver.findElement(By.name("navigate"));
      await navigatebutton.click().then();

      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== updatedUrl;
      }, 1000);
      //navigate to create page
      const updatedUrlcratePage = await driver.getCurrentUrl();
      let randomName = faker.name.fullName();
      let randomdescription=faker.lorem.paragraph();
      let randomBalance = faker.random.numeric(7);
      const productNameinputField = await driver.findElement(By.name("productName"));
      await productNameinputField.sendKeys(randomName);
      const productDescriptioninputField = await driver.findElement(By.name("productDescription"));
      await productDescriptioninputField.sendKeys(randomdescription);
       
      let dropdownList = await driver.findElement(By.name("productCategory"));
      await dropdownList.click();
      let select = new Select(dropdownList);
      await select.selectByVisibleText("Electronics(smartphones, laptops, tablets, etc.)");
     const startingPriceField = await driver.findElement(By.name("startingPrice"));
      await startingPriceField.sendKeys('5');
      const dateField = await driver.findElement(By.name("date"));
//format date jjmm00yyyyhmm
      await dateField.sendKeys("1010002024930");
      const InputField = await driver.findElement(By.name("upload"));
      await InputField.sendKeys("C:/Users/Legion/Desktop/dev-p2m/besbes.jpg");
      
      const button = await driver.findElement(By.name("button"));
      await driver.executeScript("arguments[0].scrollIntoView(true);", button);
       await driver.wait(until.elementIsVisible(button), 10000);
       await driver.executeScript("arguments[0].dispatchEvent(new MouseEvent('click', {bubbles: true}))", button);
   await driver.wait(async () => {
    const currentUrl = await driver.getCurrentUrl();
    return currentUrl !== updatedUrlcratePage;
  }, 1000);
  const Finalurl = await driver.getCurrentUrl();


      expect(Finalurl).toBe(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/`)
  
    });
 
 })
  describe("User can add bid", () => {
    let driver;

    beforeEach(async () => {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.manage().window().maximize();
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/login`);
    });

 
   
    it("should create product succesfly", async () => {

      
      let initialUrl = await driver.getCurrentUrl()
      const inputField = await driver.findElement(By.name("email"));
      await inputField.sendKeys("oussema422oussema@gmail.com");
      const loginbutton = await driver.findElement(By.name("button"));
      const passwordField = await driver.findElement(By.name("password"));
      await passwordField.sendKeys("123456");
      await loginbutton.click().then();
 
      await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== initialUrl;
      }, 1000);
      await driver.get(`http://${env.REACT_APP_CLIENT}:${env.REACT_APP_CLIENT_PORT}/bid/2`);
      
      let pBidtext
      let lastbid = await driver.findElement(By.id('lastbid')).then((pElement) => {
        pElement.getText().then((text) => {
          pBidtext = text.toString();
        });
      });;
      let regex = /\d+\.\d+/;
      let oldbid
      await driver.wait(async() => {
        return pBidtext!==undefined  
      },100);  
      let match = await  pBidtext.match(regex); 
      oldbid = match[0];
      const inputBidField = await driver.findElement(By.name("price"));
      await inputBidField.sendKeys(oldbid+1);
      const addbidbutton = await driver.findElement(By.name("submit"));
      await addbidbutton.click().then()
      let pnewestBidtext
      let newbid = await driver.findElement(By.id('lastbid')).then((pElement) => {
        pElement.getText().then((text) => {
          pnewestBidtext = text.toString();
        });
      });;
      let newestbid
      await driver.wait(async() => {
        return pnewestBidtext!==undefined  
      },100);  
      match = await  pnewestBidtext.match(regex); 
      newestbid = match[0];
      expect(newestbid).toBe(oldbid+1)

    }); 
   
  })
  

})
