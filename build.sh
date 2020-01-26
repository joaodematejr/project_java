  
#!/bin/bash
cd frontend/
./build-frontend.sh
cd ../
cd app/
./build-backend.sh
cd ../

docker-compose build