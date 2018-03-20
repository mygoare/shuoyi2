module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
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
    test : {
      user : 'vagrant',
      host : '192.168.33.10',
      port : '2222',
      ref  : 'origin/master',
      repo : 'https://Goare@bitbucket.org/Goare/shuoyi2.git',
      path : '/home/vagrant/shuoyi2',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env test',
      env  : {
        NODE_ENV: 'test'
      }
    }
  }
};
