module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Use the full name here to ensure Babel finds it inside node_modules
      "react-native-reanimated/plugin", // Always keep this last
    ],
  };
};