# Setting up a web proxy (Nginx) in front of the app containers

I decided to put Nginx in front of my docker container. This document covers the steps I took to host the Node-NLP docker container on an AWS LightSail instance and front it with an Nginx web proxy.

## Why Nginx?
I want the LightSail instance to host multiple tiny exploratory/spike/poc projects like Node-NLP. 
Each application would be hosted separtely but on the same domain. I thought I'd use AWS ALB for this but 
didn't follow through on exploring that idea due to the associated costs. I recalled choosing Nginx as the webserver for the Mr.D systems rewrite but couldn't recall details. So I needed a refresher and this projct gave me that opportunity to learn by doing again.

## Setup steps

1. Launched smallest LightSail Instance with custom user script
   1. `echo '* libraries/restart-without-asking boolean true' | sudo debconf-set-selections` (get around fancy service restart prompt when installing LibSSL)
   1. or `export DEBIAN_FRONTEND=noninteractive` (I didn't test them individually, just ran both)
1. Install certbot
   1. Install dependencies and repos
      `sudo apt-get update`
      `sudo apt-get install software-properties-common`
      `sudo add-apt-repository universe`
      `sudo add-apt-repository ppa:certbot/certbot`
      `sudo apt-get update`
   1. Install certbox packages
      `sudo apt-get install certbot python-certbot-nginx`
   1. Auto configure your webserver
      `sudo certbot --nginx` BUT -> autoconfig option which didn't work.
      I then followed this tutorial: https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-using-lets-encrypt-certificates-with-nginx and https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/.
   1. Test auto-renewal (only works if you used autoconfig method above)
      `sudo certbot renew --dry-run`
   1. Update the default ssl_ciphers list to `ssl_ciphers HIGH:!aNULL:!MD5;`. Doing this resolved the handshake error noting there wasn't an overlap in client and server supported ciphers for a successful handshake.
   1. Renewal command using DNS for auth: `sudo certbot -d ramjee.co.za -d *.ramjee.co.za --manual --preferred-challenges dns certonly`
1. Install Docker
   1. `curl -fsSL https://get.docker.com -o get-docker.sh`
   1. `sudo apt-get install -y docker-compose`
   1. `sudo sh get-docker.sh`
   1. `sudo usermod -aG docker ubuntu` (ensure 'ubuntu' user can manage containers) 
1. Created /var/containers directory
   * I'm not sure what the best practice is here but I'm for now I'm just doing a git pull so don't want config files (like docker-compose.yml for example) to mistakenly get exposed on the /var/www path.
1. Pull down the git repo
   1. `sudo mkdir node-nlp && sudo chown ubuntu:ubuntu node-nlp && cd node-nlp`
   1. `git clone https://github.com/himeshramjee/Node-NLP.git`
1. Start the container
   1. `docker-compose up -d node-nlp`
   1. Verify with `curl localhost:8000/node-nlp`
1. Install Nginx (this should be dockerized too)
   * `sudo apt-get install nginx`
1. Configure an application (node-nlp in this case)
   1. `sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak`
       * This is optional. I only need this for quick reference.
   1. `sudo rm /etc/nginx/sites-enabled/default` (disable the default nginx welcome page)
   1. `sudo cp /var/containers/node-nlp/nginx/sites-available-node-nlp.conf /etc/nginx/sites-available/node-nlp`
1. Enable the new application
   * `sudo ln -s /etc/nginx/sites-available/node-nlp /etc/nginx/sites-enabled/node-nlp`
1. Restart nginx
   1. `sudo nginx -t` (tests the config)
   1. `sudo service nginx restart` (this is a hard reset!)
1. Updated the projects index static page in S3 to reference this project.
