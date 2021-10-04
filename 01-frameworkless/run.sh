aws iam --profile username create-role \
  --role-name lambda-example \
  --assume-role-policy-document file://policy.json | tee logs/role.log

zip function.zip index.js

aws lambda --profile username create-function \
 --function-name hello-cli \
 --zip-file fileb://function.zip \
 --handler index.handler \
 --runtime nodejs12.x \
 --role arn:aws:iam::5*******6:role/lambda-example \
 | tee logs/lambda-create.log

aws lambda --profile username invoke \
 --function-name hello-cli \
 --log-type Tail \
 logs/lambda-exec.log

aws lambda --profile username update-function-code \
 --zip-file fileb://function.zip \
 --function-name hello-cli \
 --publish \
 | tee logs/lambda-update.log

aws lambda --profile username delete-function \
  --function-name hello-cli

aws iam --profile username delete-role --role-name lambda-example
