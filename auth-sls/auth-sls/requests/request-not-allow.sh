HOST=http://0.0.0.0:3000

TOKEN=$(curl -X POST \
    --silent \
    -H 'Content-Type: application/json' \
    --data '{"username": "rafaelneuhauss", "password": "password"}' \
    $HOST/dev/login | jq '.token' | sed 's/"//g' | tee token.log)

echo "TOKEN: $TOKEN"
echo

curl --silent --request GET -sL \
     --url $HOST/dev/public \
     | xargs echo "Public API: $1"
#
#curl --silent --request GET -sL \
#     --url $HOST/dev/private \
#     | xargs echo "Private API: $1"

curl --silent --request GET -sL \
     -H "Authorization: $TOKEN" \
     --url $HOST/dev/private \
     | xargs echo "Private API: $1"
