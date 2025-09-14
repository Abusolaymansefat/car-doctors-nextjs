import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// postcss.config.mjs
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

