rsync -avz -e "ssh -i ~/.ssh/pi" --exclude={node_modules,.idea,.git,.nyc_output,syncToPi.sh} ./ pi@192.168.178.37:/home/pi/projects/led-run-pi/
