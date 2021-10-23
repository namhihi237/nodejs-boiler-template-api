module.exports = {
  apps: [{
    name: 'test-pm2',
    append_env_to_name: true,
    script: 'server.js',
    instances: 4,
    autorestart: true,
    max_memory_restart: '1G',
    env: { // common env variable
      NODE_ENV: 'development'
    },
    env_production: { // khi deploy với option --env production
      NODE_ENV: "production",
      PORT: 3000
    },
    env_development: { // khi deploy với option --env development
      NODE_ENV: "development",
      PORT: 3000
    },
  }],

  deploy: {
    production: {
      user: 'poppy237', // user để ssh
      host: '192.168.1.9', // IP của server này (theo sơ đồ)
      ref: 'origin/master', // branch để pull source
      repo: 'git@github.com:namhihi237/nodejs-boiler-template-api.git', // repo của project
      path: '/var/www/html/demo-pm2', // sẽ deploy vào thư mục này
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js --env production' // cmd để deploy
    },
    development: {
      user: 'poppy237',
      host: '192.168.1.3',
      ref: 'origin/develop',
      repo: 'git@github.com:namhihi237/nodejs-boiler-template-api.git',
      path: '/var/www/html/demo-pm2',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js --env development'
    }

  }
};