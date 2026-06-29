import { Builder, By, WebDriver } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Checkbox y Radio Button", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
    await controlador.manage().window().maximize();
    await esperar(800);
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");
    await esperar(1500);
  }, 20000);

  it("checked checkbox debe estar marcado por defecto", async () => {
    const casillaMarcada = await controlador.findElement(By.id("my-check-1"));
    await esperar(800);
    expect(await casillaMarcada.isSelected()).toBe(true);
    await esperar(600);
  }, 15000);

  it("default checkbox debe poder marcarse", async () => {
    const casillaPorDefecto = await controlador.findElement(By.id("my-check-2"));
    await esperar(800);
    expect(await casillaPorDefecto.isSelected()).toBe(false);
    await esperar(600);
    await casillaPorDefecto.click();
    await esperar(800);
    expect(await casillaPorDefecto.isSelected()).toBe(true);
    await esperar(600);
  }, 15000);

  it("checked radio debe estar seleccionado por defecto", async () => {
    const radioMarcado = await controlador.findElement(By.id("my-radio-1"));
    await esperar(800);
    expect(await radioMarcado.isSelected()).toBe(true);
    await esperar(600);
  }, 15000);

  it("default radio debe poder seleccionarse", async () => {
    const radioPorDefecto = await controlador.findElement(By.id("my-radio-2"));
    await esperar(800);
    expect(await radioPorDefecto.isSelected()).toBe(false);
    await esperar(600);
    await radioPorDefecto.click();
    await esperar(800);
    expect(await radioPorDefecto.isSelected()).toBe(true);
    await esperar(1000);
  }, 15000);

  afterAll(async () => {
    await esperar(1000);
    await controlador.quit();
  });
});
