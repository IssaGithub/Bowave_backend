import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import path from "path";

const IS_DEV = process.env.APP_ENV === "dev";
const serverPort = +process.env.PORT || 3000;

export const config: VendureConfig = {
  apiOptions: {
    port: serverPort,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    cors: true,
    middleware: [],
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    requireVerification: false,
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME || "superadmin",
      password: process.env.SUPERADMIN_PASSWORD || "superadmin",
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || "cookie-secret",
    },
  },
  dbConnectionOptions: {
    type: "postgres",
    synchronize: true,
    logging: false,
    database: process.env.DB_NAME || "vendure",
    schema: process.env.DB_SCHEMA || "public",
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "vendure",
    password: process.env.DB_PASSWORD || "vendure",
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      globalTemplateVars: {
        fromAddress: '"Vendure" <noreply@vendure.io>',
      },
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: serverPort + 1,
    }),
  ],
};
