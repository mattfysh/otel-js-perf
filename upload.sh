set -e

FUNCTION_NAME="otel-js-perf"

zip -r function.zip .

aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://function.zip

rm function.zip
