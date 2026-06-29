import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

describe("Using Selenium - Ejemplo oficial", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
  }, 15000);

  it("ocho componentes", async () => {
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");

    const titulo = await controlador.getTitle();
    expect(titulo).toBe("Web form");

    const campoTexto = await controlador.findElement(By.name("my-text"));
    const botonEnviar = await controlador.findElement(By.css("button"));

    await campoTexto.sendKeys("Selenium");
    await botonEnviar.click();

    await controlador.wait(until.elementLocated(By.id("message")), 5000);
    const mensaje = await controlador.findElement(By.id("message"));
    const valor = await mensaje.getText();
    expect(valor).toBe("Received!");
  }, 15000);

  afterAll(async () => {
    await controlador.quit();
  });
});
