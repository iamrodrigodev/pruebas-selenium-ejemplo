import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Using Selenium - Ejemplo oficial", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
    await controlador.manage().window().maximize();
  }, 15000);

  it("ocho componentes", async () => {
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");
    await esperar(1500);

    const titulo = await controlador.getTitle();
    expect(titulo).toBe("Web form");
    await esperar(1000);

    const campoTexto = await controlador.findElement(By.name("my-text"));
    await campoTexto.click();
    await esperar(600);

    for (const letra of "Selenium") {
      await campoTexto.sendKeys(letra);
      await esperar(120);
    }
    await esperar(800);

    const botonEnviar = await controlador.findElement(By.css("button"));
    await botonEnviar.click();
    await esperar(1000);

    await controlador.wait(until.elementLocated(By.id("message")), 5000);
    const mensaje = await controlador.findElement(By.id("message"));
    await esperar(1200);

    const valor = await mensaje.getText();
    expect(valor).toBe("Received!");
    await esperar(1500);
  }, 30000);

  afterAll(async () => {
    await esperar(1000);
    await controlador.quit();
  });
});
