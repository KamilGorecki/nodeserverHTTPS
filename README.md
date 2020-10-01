# nodeserverHTTPS

Steps:
(for DigitalOcean)

1. Buy a domain.
2. Create new Droplet on digital ocean. 
3. Add Domain.
4. Change DNSs for your domain to digital ocean.
5. Create Certificate on your server: <br>
	a) sudo add-apt-repository ppa:certbot/certbot<br>
  b) sudo apt-get update<br>
  c) sudo apt install certbot<br>
  d) sudo certbot certonly --standalone --preferred-challenges http -d <your_domain><br>
     (domain must be working before this step)<br>
	e) run 'sudo node server.js'
