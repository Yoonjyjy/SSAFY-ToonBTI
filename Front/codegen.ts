import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "https://j8a302.p.ssafy.io/apis",
    "https://j8a302.p.ssafy.io/apid/graphql",
  ],
  documents: ["src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};
export default config;
