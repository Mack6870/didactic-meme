/**
 * AWS service helpers — centralise SDK setup here.
 *
 * Install the packages you need:
 *   npm install @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @aws-sdk/client-lambda
 */

// const { S3Client } = require('@aws-sdk/client-s3');
// const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
// const config = require('../config');
//
// const s3 = new S3Client({ region: config.aws.region });
// const lambda = new LambdaClient({ region: config.aws.region });
//
// /**
//  * Invoke a Lambda function by name.
//  */
// const invokeLambda = async (functionName, payload) => {
//   const command = new InvokeCommand({
//     FunctionName: functionName,
//     Payload: JSON.stringify(payload),
//   });
//   const response = await lambda.send(command);
//   return JSON.parse(Buffer.from(response.Payload).toString());
// };
//
// module.exports = { s3, lambda, invokeLambda };

module.exports = {};
