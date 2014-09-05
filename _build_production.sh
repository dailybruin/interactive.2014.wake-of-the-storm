#! /bin/bash
source /var/www/.rvm/scripts/rvm
jekyll build --config _config.yml,_config_production.yml
