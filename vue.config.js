module.exports = {
  publicPath: '/paintings/',
  css: {
    extract: false,
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/mixins.scss"',
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
