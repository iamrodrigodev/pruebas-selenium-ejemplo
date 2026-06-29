import { Builder, By, WebDriver, until } from "selenium-webdriver";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { TIEMPOS } from "../constantes/tiempos";

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

describe("Using Selenium - Ejemplo oficial", () => {
  let controlador: WebDriver;

  beforeAll(async () => {
    controlador = await new Builder().forBrowser("chrome").build();
    await controlador.manage().window().maximize();
  }, 15000);

  it("ocho componentes", async () => {
    await controlador.get("https://www.selenium.dev/selenium/web/web-form.html");
    await esperar(TIEMPOS.PAGINA_CARGA);
    await capturar(controlador, "01-pagina-cargada");

    const titulo = await controlador.getTitle();
    expect(titulo).toBe("Web form");
    await esperar(TIEMPOS.ESPERA_FINAL);

    const campoTexto = await controlador.findElement(By.name("my-text"));
    await campoTexto.click();
    await esperar(TIEMPOS.LECTURA_CORTA);

    for (const letra of "Selenium") {
      await campoTexto.sendKeys(letra);
      await esperar(TIEMPOS.TECLA);
    }
    await esperar(TIEMPOS.ACCION_PAUSA);
    await capturar(controlador, "02-texto-ingresado");

    const botonEnviar = await controlador.findElement(By.css("button"));
    await botonEnviar.click();
    await esperar(TIEMPOS.ESPERA_FINAL);

    await controlador.wait(until.elementLocated(By.id("message")), 5000);
    const mensaje = await controlador.findElement(By.id("message"));
    await esperar(TIEMPOS.LECTURA_LARGA);
    await capturar(controlador, "03-mensaje-recibido");

    const valor = await mensaje.getText();
    expect(valor).toBe("Received!");
    await esperar(TIEMPOS.RESULTADO);
  }, 30000);

  afterAll(async () => {
    await esperar(TIEMPOS.ESPERA_FINAL);
    await controlador.quit();
  });
});
