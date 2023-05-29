#!/bin/bash
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "Fetched public IP: ${PUBLIC_IP}"
sed -i "s/__PUBLIC_IP__/${PUBLIC_IP}/g" /etc/nginx/sites-available/test
echo "Replaced __PUBLIC_IP__ with ${PUBLIC_IP} in /etc/nginx/sites-available/test"
service nginx restart
echo "Restarted NGINX service"
