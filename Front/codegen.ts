import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://j8a302.p.ssafy.io/apis",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};
export default config;
