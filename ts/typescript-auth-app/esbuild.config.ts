import { build } from "esbuild";
const glob = require('glob')
const entryPoints = glob.sync('./src/**/*.{ts,js}')

build({
  entryPoints,
  outbase: './src',
  outdir: "./dist",
  platform: "node",
  target: "node20",
  minify: false,
  bundle: true,
  external: ["bcrypt", "aws-sdk", "mock-aws-s3", "nock"],
  loader: {
    ".html": "text" // If you are importing .html files
  },
}).catch(() => process.exit(1));
