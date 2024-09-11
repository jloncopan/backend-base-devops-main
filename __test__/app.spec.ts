import { describe, test, expect } from "@jest/globals";
import { esPrimo} from "../src/numeros.js";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => {

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

    describe('esPrimo', () => {
        // Caso 1: Número menor que 2
        test('debería devolver false para números menores que 2', () => {
            expect(esPrimo(0)).toBe(false);
            expect(esPrimo(1)).toBe(false);
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