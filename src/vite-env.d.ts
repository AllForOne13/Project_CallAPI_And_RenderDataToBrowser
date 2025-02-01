/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_TOKEN: string;
    readonly VITE_API_URL: string; // Example of another environment variable
    readonly VITE_OTHER_SECRET: string; // Another example
    // Add more environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
