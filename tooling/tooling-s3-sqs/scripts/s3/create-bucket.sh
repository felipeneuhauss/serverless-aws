BUCKET_NAME=$1
aws --endpoint-url=http://localhost:4566 s3 mb s3://$BUCKET_NAME --profile felipeneuhauss
aws --endpoint-url=http://localhost:4566 s3 ls --profile felipeneuhauss