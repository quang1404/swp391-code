module.exports = {
  apps: [{
    name: "koicare",
    script: "./app.js",
    instances: 1,
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      DATABASE_HOST:localhost,
      DATABASE_USER:root,
      DATABASE_PASSWORD:123456789,
      DATABASE :koicare,
      JWT_SECRET: "very_secret_password"
    }
  }]
};