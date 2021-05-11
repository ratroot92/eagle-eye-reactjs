!#/bin/bash
sudo  scp  -i /home/asd/Desktop/KEYS/eagle_eye.pem -r /home/asd/Desktop/DRF/frontend/ ubuntu@54.180.116.185:/home/ubuntu/eagle_eye/frontend/
sudo  scp  -i /home/asd/Desktop/KEYS/eagle_eye.pem -r /home/asd/Desktop/DRF/backend/ ubuntu@54.180.116.185:/home/ubuntu/eagle_eye/backend/
sudo  scp  -i /home/asd/Desktop/KEYS/eagle_eye.pem -r /home/asd/Desktop/DRF/db/ ubuntu@54.180.116.185:/home/ubuntu/eagle_eye/db/
sudo  scp  -i /home/asd/Desktop/KEYS/eagle_eye.pem -r /home/asd/Desktop/DRF/database/ ubuntu@54.180.116.185:/home/ubuntu/eagle_eye/database/

#   IdentityFile /home/asd/Desktop/KEYS/eagle_eye.pem
