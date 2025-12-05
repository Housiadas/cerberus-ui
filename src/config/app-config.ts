import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Cerberus",
  version: packageJson.version,
  copyright: `© ${currentYear}, Cerberus.`,
  meta: {
    title: "",
    description: "",
  },
};
