import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Using Selenium - Ejemplo oficial", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  }, 15000);

  it("eight components", async () => {
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");

    const title = await driver.getTitle();
    expect(title).toBe("Web form");

    const textBox = await driver.findElement(By.name("my-text"));
    const submitButton = await driver.findElement(By.css("button"));

    await textBox.sendKeys("Selenium");
    await submitButton.click();

    await driver.wait(until.elementLocated(By.id("message")), 5000);
    const message = await driver.findElement(By.id("message"));
    const value = await message.getText();
    expect(value).toBe("Received!");
  }, 15000);

  afterAll(async () => {
    await driver.quit();
  });
});
