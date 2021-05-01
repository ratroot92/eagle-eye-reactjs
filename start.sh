#/bin/bash
/home/asd/stopServices.sh

docker-compose -f "/home/asd/Desktop/development/PEC_ADMIN/cpdExam/docker-compose.yml" down
docker-compose -f "docker-compose.yml" up -d --build