module.exports = {
  publicPath: '/paintings/',
  css: {
    extract: false,
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/main.scss";
        `,
        additionalData: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/mixins.scss";
        `,
      },
    },
  },
};
