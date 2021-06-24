npm i -g serverless

sls

sls deploy

# invoke AWS
sls invoke -f scheduler

# invoke local
sls invoke local -f scheduler --logs

# Check logs
sls logs -f hello --tail

# Remove
sls remove

