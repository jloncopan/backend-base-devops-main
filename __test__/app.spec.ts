import { describe, test, expect } from "@jest/globals";
import { esPrimo} from "../src/numeros.js";
import { esPalindromo} from "../src/palindromo.js";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => { 
    
    //EndPoints    
    test("endpoint key", async() => {
        return await request(app)
            .get("/key")
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
        });
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

    test('Endpoint  /palindromo: Ingreso vacío', async () => {
        return await request(app)
            .get("/palindromo/")
            .expect("Content-Type", /text\/html/)
            .expect(404)
    });

    test('Endpoint  /palindromo: Ingreso espacios', async () => {
        return await request(app)
            .get("/palindromo/     ")
            .expect("Content-Type", /text\/html/)
            .expect(404)
    });

    
    test('Endpoint  /palindromo: Ingreso palindromo con mayúsculas y minúsculas', async () => {
        return await request(app)
            .get("/palindromo/Anita%20lava%20la%20tina")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    test('Endpoint  /palindromo: Ingreso con símbolos', async () => {
        return await request(app)
            .get("/palindromo/Anita%20&lava%20#la%20tina")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });


    test('Endpoint  /palindromo: Ingreso no es un palíndromo', async () => {
        return await request(app)
            .get("/palindromo/hola%20amigo%20dev")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });

    test('Endpoint  /palindromo: Ingreso solo un caracter', async () => {
        return await request(app)
            .get("/palindromo/C")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });


    test('Endpoint  /palindromo: Ingreso solo numeros', async () => {
        return await request(app)
            .get("/palindromo/9876543210123456789")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    

    test('Endpoint  /primo: Ingreso negativo', async () => {
        return await request(app)
            .get("/primo/-5")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso cero', async () => {
        return await request(app)
            .get("/primo/0")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso uno', async () => {
        return await request(app)
            .get("/primo/1")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso dos, menor número primo', async () => {
        return await request(app)
            .get("/primo/2")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso numero sobre 100000 primo', async () => {
        return await request(app)
            .get("/primo/100003")  
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso numero sobre 100000 no primo', async () => {
        return await request(app)
            .get("/primo/100500")  
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso par no primo', async () => {
        return await request(app)
            .get("/primo/18")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso de número primo', async () => {
        return await request(app)
            .get("/primo/13")  
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Endpoint  /primo: Ingreso de número impar no primo', async () => {
        return await request(app)
            .get("/primo/15")  
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

     //Métodos
    test('Retorno false para números menores que 2', () => {
        expect(esPrimo(0)).toBe(false);
        expect(esPrimo(1)).toBe(false);
    });

    
    test('Retorno true para números primos', () => {
        expect(esPrimo(2)).toBe(true);
        expect(esPrimo(3)).toBe(true);
        expect(esPrimo(5)).toBe(true);
        expect(esPrimo(7)).toBe(true);
    });

    
    test('Retorno false para números no primos', () => {
        expect(esPrimo(4)).toBe(false);
        expect(esPrimo(6)).toBe(false);
        expect(esPrimo(8)).toBe(false);
        expect(esPrimo(9)).toBe(false);
    });

    
    test('Retorno true para frases palíndromas', () => {
        expect(esPalindromo('arenera')).toBe(true);
        expect(esPalindromo('aibofobia')).toBe(true);
        expect(esPalindromo('oso')).toBe(true);
    });

    
    test('Retorno false para frases no palíndromas', () => {
        expect(esPalindromo('hola Mundo')).toBe(false);
        expect(esPalindromo('pruebas')).toBe(false);
        expect(esPalindromo('al igual que otros ejemplos')).toBe(false);
    });

    
    test('Retorno true para frases con espacios que son palíndromas', () => {
        expect(esPalindromo('la ruta natural')).toBe(true);
        expect(esPalindromo('yo dono rosas oro no doy')).toBe(true);
    });

    
    test('Retorno true para frases con mayúsculas que son palíndromas', () => {
        expect(esPalindromo('Dabale arroz a la zorra el abad')).toBe(true);
        expect(esPalindromo('La sal')).toBe(true);
    });

    
    test('Retorno true para una cadena vacía', () => {
        expect(esPalindromo('')).toBe(true);
    });

    
    test('Retorno false cuando se agregan símbolos', () => {
        expect(esPalindromo('Anita, lava la tina')).toBe(false);
        expect(esPalindromo('La ruta natural:')).toBe(false);
    });

    




});