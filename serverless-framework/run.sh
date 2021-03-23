npm i -g serverless

sls

sls deploy

# invoke AWS
sls invoke -f hello

# invoke local
sls invoke local -f hello --logs

# Check logs
sls logs -f hello --tail

# Remove
sls remove

