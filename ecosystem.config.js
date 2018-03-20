module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'shuoyi',
      script    : 'app.js',
      env: {
        // 默认开发环境
        NODE_ENV: 'development'
      },
      env_production : {
        // 命令行 切换后 切换到 生产环境
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '167.99.68.197',
      ref  : 'origin/master',
      repo : 'https://Goare@bitbucket.org/Goare/shuoyi2.git',
      path : '/root/shuoyi2',
      'post-deploy' : 'npm install --production && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'vagrant',
      host : '127.0.0.1',
      port : '2222',
      ref  : 'origin/master',
      repo : 'git@bitbucket.org:Goare/shuoyi2.git',
      path : '/home/vagrant/shuoyi2',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js',
    }
  }
};
