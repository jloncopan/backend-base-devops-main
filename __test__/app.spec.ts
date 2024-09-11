import { describe, test, expect } from "@jest/globals";
import { esPrimo} from "../src/numeros.js";
import { esPalindromo} from "../src/palindromo.js";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => { 


    

    test("endpoint key", async() => {
        return await request(app)
            .get("/key")
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
        });
    });

    test("endpoint /palindromo", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /primo", () => {
        expect(1 + 1).toBe(2);
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });

    // Caso 1: Número menor que 2
    test('debería devolver false para números menores que 2', () => {
        expect(esPrimo(0)).toBe(false);
        expect(esPrimo(1)).toBe(false);
    });

    // Caso 2: Número primo
    test('debería devolver true para números primos', () => {
        expect(esPrimo(2)).toBe(true);
        expect(esPrimo(3)).toBe(true);
        expect(esPrimo(5)).toBe(true);
        expect(esPrimo(7)).toBe(true);
    });

    // Caso 3: Número no primo
    test('debería devolver false para números no primos', () => {
        expect(esPrimo(4)).toBe(false);
        expect(esPrimo(6)).toBe(false);
        expect(esPrimo(8)).toBe(false);
        expect(esPrimo(9)).toBe(false);
    });

    // Caso 1: Frases palíndromas
    test('debería devolver true para frases palíndromas', () => {
        expect(esPalindromo('Anita lava la tina')).toBe(true);
        expect(esPalindromo('A man a plan a canal Panama')).toBe(true);
        expect(esPalindromo('No lemon no melon')).toBe(true);
    });

    // Caso 2: Frases no palíndromas
    test('debería devolver false para frases no palíndromas', () => {
        expect(esPalindromo('Hello World')).toBe(false);
        expect(esPalindromo('Testing')).toBe(false);
        expect(esPalindromo('Palindrome example')).toBe(false);
    });

    // Caso 3: Frases con espacios
    test('debería devolver true para frases con espacios que son palíndromas', () => {
        expect(esPalindromo('A Santa at NASA')).toBe(true);
        expect(esPalindromo('Was it a car or a cat I saw')).toBe(true);
    });

    // Caso 4: Frases con mayúsculas
    test('debería devolver true para frases con mayúsculas que son palíndromas', () => {
        expect(esPalindromo('Eva can I see bees in a cave')).toBe(true);
        expect(esPalindromo('Madam In Eden Im Adam')).toBe(true);
    });

    // Caso 5: Cadena vacía
    test('debería devolver true para una cadena vacía', () => {
        expect(esPalindromo('')).toBe(true);
    });

    // Caso 4: Frases con mayúsculas
    test('debería devolver false cuando se agregan símbolos', () => {
        expect(esPalindromo('Eva, can I see bees in a cave?')).toBe(false);
        expect(esPalindromo('Madam In Eden I´m Adam')).toBe(false);
    });

    test('Frase vacía', async () => {
        return await request(app)
            .get("/palindromo/")
            .expect("Content-Type", /text\/html/)
            .expect(404)
            /*.then((response) => {
                expect(response.text).toBe("Hola, debe enviar una frase");
            });*/
    });

    test('Frase solo con espacios', async () => {
        return await request(app)
            .get("/palindromo/     ")
            .expect("Content-Type", /text\/html/)
            .expect(404)
            /*.then((response) => {
                expect(response.text).toBe("Hola, debe enviar una frase con algun caracter");
            });*/
    });

    test('Frase con caracteres especiales', async () => {
        return await request(app)
            .get("/palindromo/a%20man,%20a%20plan,%20a%20canal,%20Panama")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });

    test('Frase con mayúsculas y minúsculas', async () => {
        return await request(app)
            .get("/palindromo/Able%20was%20I%20ere%20I%20saw%20Elba")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    test('Frase no palíndromo', async () => {
        return await request(app)
            .get("/palindromo/Hello%20World")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });

    test('Frase con números y letras', async () => {
        return await request(app)
            .get("/palindromo/12321")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    test('Frase con solo una letra', async () => {
        return await request(app)
            .get("/palindromo/a")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });
    /*test("endpoint /palindromo", () => {
        expect(1 + 1).toBe(2);
    });*/

    test('Número negativo', async () => {
        return await request(app)
            .get("/primo/-1")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 0', async () => {
        return await request(app)
            .get("/primo/0")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 1', async () => {
        return await request(app)
            .get("/primo/1")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 2 (el primer número primo)', async () => {
        return await request(app)
            .get("/primo/2")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número grande-primo', async () => {
        return await request(app)
            .get("/primo/7919")  // 7919 es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número grande-no primo', async () => {
        return await request(app)
            .get("/primo/8000")  // 8000 no es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número par mayor a 2, no primo', async () => {
        return await request(app)
            .get("/primo/10")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número primo', async () => {
        return await request(app)
            .get("/primo/13")  // 13 es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número no primo', async () => {
        return await request(app)
            .get("/primo/9")  // 9 no es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('No número', async () => {
        return await request(app)
            .get("/primo/a")  // a no es numero
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });




});