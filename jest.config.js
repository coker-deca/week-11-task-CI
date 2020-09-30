module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
  testRegex: "(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
