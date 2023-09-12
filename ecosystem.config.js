module.exports = [
  {
    name: "corvus-frontend",
    script: "server.js",
    autorestart: true,
    watch: false,
    exec_mode: "cluster",
    merge_logs: true,
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      APP_PORT: 3000,
    },
  },
];
