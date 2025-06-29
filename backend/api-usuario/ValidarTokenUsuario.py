import boto3
import json
from datetime import datetime
from zoneinfo import ZoneInfo

def lambda_handler(event, context):
    try:
        # Leer token desde el header o body
        if 'headers' in event and 'Authorization' in event['headers']:
            token = event['headers']['Authorization']
        else:
            body = json.loads(event.get('body', '{}'))
            token = body.get('token')

        if not token:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Token no proporcionado'})
            }

        dynamodb = boto3.resource('dynamodb')
        t_tokens = dynamodb.Table('t_tokens_acceso1')

        # Buscar el token en la tabla
        response = t_tokens.get_item(Key={'token': token})
        if 'Item' not in response:
            return {
                'statusCode': 403,
                'body': json.dumps({'error': 'Token inválido o no encontrado'})
            }

        item = response['Item']
        expires_str = item['expires']
        expires_dt = datetime.strptime(expires_str, '%Y-%m-%d %H:%M:%S')
        now = datetime.now(ZoneInfo("America/Lima"))

        if now > expires_dt:
            return {
                'statusCode': 403,
                'body': json.dumps({'error': 'Token expirado'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Token válido',
                'tenant_id': item['tenant_id'],
                'user_id': item['user_id'],
                'expires': item['expires']
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
