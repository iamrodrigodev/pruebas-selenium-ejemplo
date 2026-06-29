import { Builder, By, WebDriver } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Checkbox y Radio Button", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");
  }, 15000);

  it("checked checkbox debe estar marcado por defecto", async () => {
    const casillaMarcada = await controlador.findElement(By.id("my-check-1"));
    expect(await casillaMarcada.isSelected()).toBe(true);
  }, 10000);

  it("default checkbox debe poder marcarse", async () => {
    const casillaPorDefecto = await controlador.findElement(By.id("my-check-2"));
    expect(await casillaPorDefecto.isSelected()).toBe(false);
    await casillaPorDefecto.click();
    expect(await casillaPorDefecto.isSelected()).toBe(true);
  }, 10000);

  it("checked radio debe estar seleccionado por defecto", async () => {
    const radioMarcado = await controlador.findElement(By.id("my-radio-1"));
    expect(await radioMarcado.isSelected()).toBe(true);
  }, 10000);

  it("default radio debe poder seleccionarse", async () => {
    const radioPorDefecto = await controlador.findElement(By.id("my-radio-2"));
    expect(await radioPorDefecto.isSelected()).toBe(false);
    await radioPorDefecto.click();
    expect(await radioPorDefecto.isSelected()).toBe(true);
  }, 10000);

  afterAll(async () => {
    await controlador.quit();
  });
});
