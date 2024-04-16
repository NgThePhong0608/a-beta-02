import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path"; // Import path module

export default defineConfig({
    plugins: [laravel(["resources/js/app.js"])],
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
        },
    },
});
