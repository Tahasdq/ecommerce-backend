import dotenv from "dotenv"

// load default env based on NODE_ENV
dotenv.config()

// override for local
if (process.env?.["NODE_ENV"]?.trim() === "local") {
  dotenv.config({ path: ".env.local", override: true })
}
