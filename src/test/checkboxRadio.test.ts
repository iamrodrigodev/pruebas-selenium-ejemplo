import { Builder, By, WebDriver } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Checkbox y Radio Button", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.selenium.dev/selenium/web/web-form.html");
  }, 15000);

  it("checked checkbox debe estar marcado por defecto", async () => {
    const checkedBox = await driver.findElement(By.id("my-check-1"));
    expect(await checkedBox.isSelected()).toBe(true);
  }, 10000);

  it("default checkbox debe poder marcarse", async () => {
    const defaultBox = await driver.findElement(By.id("my-check-2"));
    expect(await defaultBox.isSelected()).toBe(false);
    await defaultBox.click();
    expect(await defaultBox.isSelected()).toBe(true);
  }, 10000);

  it("checked radio debe estar seleccionado por defecto", async () => {
    const checkedRadio = await driver.findElement(By.id("my-radio-1"));
    expect(await checkedRadio.isSelected()).toBe(true);
  }, 10000);

  it("default radio debe poder seleccionarse", async () => {
    const defaultRadio = await driver.findElement(By.id("my-radio-2"));
    expect(await defaultRadio.isSelected()).toBe(false);
    await defaultRadio.click();
    expect(await defaultRadio.isSelected()).toBe(true);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  });
});
