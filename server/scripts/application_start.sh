#!/bin/bash

pm2 stop
pm2 delete all
pm2  start /home/ubuntu/MedCloudEHR/server.js

