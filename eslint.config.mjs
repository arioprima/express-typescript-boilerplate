import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    // 1. Target file yang mau dicek
    { files: ["src/**/*.{js,mjs,cjs,ts}"] },

    // 2. Folder yang DIABAIKAN (Wajib ada biar folder build gak dicek)
    { ignores: ["dist", "node_modules"] },

    // 3. Setting environment (Node.js)
    { languageOptions: { globals: globals.node } },

    // 4. Gunakan aturan standar yang direkomendasikan
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,

    // 5. ATURAN KHUSUS TIM ANDA (Custom Rules)
    {
        rules: {
            "no-unused-vars": "warn",        // Peringatan kalau ada variabel nganggur
            "no-console": "warn",            // Peringatan kalau ada console.log ketinggalan
            "@typescript-eslint/no-explicit-any": "error", // HARAMKAN 'any' secara total
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }] // Variabel tak terpakai jadi warning aja, kecuali diawali _
        },
    },
    eslintConfigPrettier
];