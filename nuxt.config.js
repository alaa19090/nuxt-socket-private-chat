module.exports = {
  telemetry: false,
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/proxy"],
  axios: {
    // baseURL: 'https://cenna.org/',
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: "http://api.cenna.org/api",
      pathRewrite: { "^/api/": "" },
    },
  },
  auth: {
    fullPathRedirect: true,
    strategies: {
      local: {
        endpoints: {
          login: { url: "/api/login/", method: "post", propertyName: "token" },
          logout: { url: "/api/logout/", method: "post" },
          user: {
            url: "/api/user-data/",
            method: "post",
            propertyName: "data",
          },
        },
      },
    },
    redirect: {
      login: "/auth",
      logout: "/",
      callback: "/callback",
      home: false,
    },
  },
  env: {
    WS_URL: process.env.WS_URL || "http://localhost:3000",
  },
};
