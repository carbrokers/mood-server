module.exports = {
  "apps":[
      {
          "name": "mood", 
          "script": "app.js", 
          "env": {
              "COMMON_VARIABLE": "true"
          },
          "env_production": {
              "NODE_ENV": "production" 
          }
      }
  ],
  "deploy": {
      "production": {
          "user":"root",
          "host": ["119.45.20.138"],
          "port": "22",
          "ref": "origin/main",
          "repo": "git@github.com:carbrokers/mood-server.git",
          "path": "/www/website/moodserver",
          "ssh_options": "StrictHostKeyChecking=no",
          "pre-setup": "echo 'This is a pre-setup command'",
          "post-setup": "ls -la",
          "pre-deploy-local": "echo 'This is a pre-deploy-local command'",
          "post-deploy" : "npm install && pm2 start 0"
      }
  }
}