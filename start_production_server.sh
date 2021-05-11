#/bin/bash

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
cd /home/ubuntu/eagle_eye/frontend/
yarn 
cd ..
docker-compose -f "docker-compose.yml" down
docker-compose -f "docker-compose.yml" up -d --build