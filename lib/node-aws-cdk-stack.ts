import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NodeAwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const [lambda,apiGateway] = [cdk.aws_lambda,cdk.aws_apigateway]

     //Lambda entry point
     const testLambda = new lambda.Function(this,"lambda",{
      runtime:lambda.Runtime.NODEJS_20_X,
      handler:'index.handler',
      code:lambda.Code.fromAsset('lambda'),
      timeout:cdk.Duration.seconds(900),
      functionName: 'testLambda'
     });

     const testApiGateway = new apiGateway.RestApi(this,'testApiGateway',{
      restApiName:'test api',
      description:'this is api layer over the lambda for the testing' 
     });

     const testLambdaApiGatewayIntegration = new apiGateway.LambdaIntegration(testLambda,{
      proxy:true
     });

     const resource = testApiGateway.root.addResource("{api+}")
     resource.addMethod('ANY',testLambdaApiGatewayIntegration)
  }
}
