import { Builder, By, WebDriver, WebElement } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const carpetaScreenshots = path.resolve("screenshots");
if (!fs.existsSync(carpetaScreenshots)) {
  fs.mkdirSync(carpetaScreenshots, { recursive: true });
}

async function capturar(controlador: WebDriver, nombre: string) {
  const imagen = await controlador.takeScreenshot();
  const rutaArchivo = path.join(carpetaScreenshots, `${nombre}.png`);
  fs.writeFileSync(rutaArchivo, imagen, "base64");
}

async function scrollAlElemento(controlador: WebDriver, elemento: WebElement) {
  await controlador.executeScript(
    "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
    elemento
  );
  await esperar(600);
}

describe("Checkbox y Radio Button", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
    await controlador.manage().window().maximize();
    await esperar(800);
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");
    await esperar(1500);
    await capturar(controlador, "04-checkbox-radio-pagina-cargada");
  }, 20000);

  it("checked checkbox debe estar marcado por defecto", async () => {
    const casillaMarcada = await controlador.findElement(By.id("my-check-1"));
    await scrollAlElemento(controlador, casillaMarcada);
    expect(await casillaMarcada.isSelected()).toBe(true);
    await capturar(controlador, "05-checkbox-1-marcado-por-defecto");
    await esperar(600);
  }, 15000);

  it("default checkbox debe poder marcarse", async () => {
    const casillaPorDefecto = await controlador.findElement(By.id("my-check-2"));
    await scrollAlElemento(controlador, casillaPorDefecto);
    expect(await casillaPorDefecto.isSelected()).toBe(false);
    await capturar(controlador, "06-checkbox-2-desmarcado");
    await esperar(600);
    await casillaPorDefecto.click();
    await esperar(800);
    expect(await casillaPorDefecto.isSelected()).toBe(true);
    await capturar(controlador, "07-checkbox-2-marcado");
    await esperar(600);
  }, 15000);

  it("checked radio debe estar seleccionado por defecto", async () => {
    const radioMarcado = await controlador.findElement(By.id("my-radio-1"));
    await scrollAlElemento(controlador, radioMarcado);
    expect(await radioMarcado.isSelected()).toBe(true);
    await capturar(controlador, "08-radio-1-seleccionado-por-defecto");
    await esperar(600);
  }, 15000);

  it("default radio debe poder seleccionarse", async () => {
    const radioPorDefecto = await controlador.findElement(By.id("my-radio-2"));
    await scrollAlElemento(controlador, radioPorDefecto);
    expect(await radioPorDefecto.isSelected()).toBe(false);
    await capturar(controlador, "09-radio-2-deseleccionado");
    await esperar(600);
    await radioPorDefecto.click();
    await esperar(800);
    expect(await radioPorDefecto.isSelected()).toBe(true);
    await capturar(controlador, "10-radio-2-seleccionado");
    await esperar(1000);
  }, 15000);

  afterAll(async () => {
    await esperar(1000);
    await controlador.quit();
  });
});
