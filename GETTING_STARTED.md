# 1. UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A

This article focuses on Lambda micro services - the good parts
and to make this as short an concise as possible, I'm assuming
that readers are well-versed in the following:

-   Git
-   Typescript
-   NodeJS
-   AWS CLI

To save us the time, you'll first need to clone the [repository](https://github.com/g-six/lambda-the-good-parts).

```
# Then install the node packages
npm i
```

## 2. START

-   edit index.ts

## 3. Deploy to AWS Lambda

#### Package your code

```bash
npm run build
cd dist
zip -r ../users-api ./
```

#### Create a bucket to store your code package

```bash
aws cloudformation create-stack \
--stack-name kastle-lambda-bucket \
--template-body file://cf-s3-lambda.yml
```

#### Upload package to newly created bucket `kastle-lambda-functions`

Using the bucket name set in the cloudformation file, let's  
upload the package:

```bash
aws s3 cp ./users-api.zip s3://kastle-lambda-functions/
```

#### Create the lambda stack

Let's deploy the lambda function by creating the cloudformation  
stack.  
And since we would be creating an execution role, we need to  
pass the `--capabilities CAPABILITY_IAM` CLI parameter:

```bash
aws cloudformation create-stack \
--stack-name kastle-lambda-users-api \
--capabilities CAPABILITY_IAM \
--template-body file://cf-lambda.yml
```

#### Test the function

Retrieve your lambda function id `PhysicalResourceId` by the stack  
resources:

```bash
aws cloudformation describe-stack-resources \
--stack-name kastle-lambda-users-api \
--logical-resource-id LambdaUserApi \
--query StackResources[*].PhysicalResourceId

# Outputs something like...
kastle-lambda-users-api-LambdaUserApi-JWV1VETPU4AM

# Using the output
aws lambda invoke \
--function-name kastle-lambda-users-api-LambdaUserApi-1PT4VOSX1ZV25 \
--profile candid-g6 \
outfile.txt && printf "\n\n" >> outfile.txt && cat outfile.txt && rm outfile.txt

# Should output
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
"{}"
```
