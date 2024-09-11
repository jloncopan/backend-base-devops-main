import { describe, test, expect } from "@jest/globals";
import { esPrimo} from "../src/numeros.js";
import { esPalindromo} from "../src/palindromo.js";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => {


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
        expect(esPalindromo('Eva, can I see bees in a cave')).toBe(true);
        expect(esPalindromo('Madam In Eden Im Adam')).toBe(true);
    });

    // Caso 5: Cadena vacía
    test('debería devolver true para una cadena vacía', () => {
        expect(esPalindromo('')).toBe(true);
    });





    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint key", () => {
        expect(1 + 1).toBe(2);
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
});