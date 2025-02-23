#!/bin/bash
sudo  chmod +x /MedCloudEHR/scripts/application_start.sh
sudo chmod +x /MedCloudEHR/scripts/after_install.sh
cd /MedCloudEHR && npm cache clean --force &&  npm install --verbose && cp /.env $PWD

