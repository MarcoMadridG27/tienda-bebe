import boto3
import json
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    try:
        print("Evento recibido:", event)
        token = event['headers'].get('Authorization')

        if not token:
            return {
                'statusCode': 401,
                'body': json.dumps({ 'error': 'Token no proporcionado' })
            }
        lambda_client = boto3.client('lambda')
        payload = json.dumps({ "token": token })
        response = lambda_client.invoke(
            FunctionName="api-bebes-dev-validarUsuario",
            InvocationType='RequestResponse',
            Payload=payload
        )
        validation = json.loads(response['Payload'].read())

        if validation['statusCode'] == 403:
            return {
                'statusCode': 403,
                'body': json.dumps({ 'error': 'Token inválido' })
            }
        user_data = json.loads(validation['body'])
        tenant_id = user_data['tenant_id']
        user_id = user_data['user_id']
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('t_compras1')

        result = table.query(
            IndexName='idx_usuario',
            KeyConditionExpression=Key('tenant_id').eq(tenant_id) & Key('user_id').eq(user_id)
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'compras': result.get('Items', []),
                'cantidad': result.get('Count', 0)
            }, default=str)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({ 'error': str(e) })
        }