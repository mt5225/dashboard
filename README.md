# uniroom dashboard

# to run the application with databack-end

## make sure mongodb is running
`` ps -eaf|grep mongo ``

## startup data backend
`` cd /Users/mt5225/Projects/uniroom/data-backend && gulp serve ``

## check data backend
`` curl -i -H "Accept: application/json" http://localhost:4040/api/bookingrecords/records/1f93deb0-9b08-11e6-9f33-a24fc0d9649c ``

## start web service
`` npm start ``

it will open browser and visit the app


## switch backend api server address

api.js  `` const BASE_URL = localhost ``

## deploy
ansible-playbook uniroom_op_frontend.yml