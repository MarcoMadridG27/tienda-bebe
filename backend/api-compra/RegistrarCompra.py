import boto3
import json
import uuid
from datetime import datetime
from decimal import Decimal

def lambda_handler(event, context):
    try:
        print("Evento recibido:", event)
        body = json.loads(event['body'])
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
        productos = [
            {
                **p,
                "precio": Decimal(str(p["precio"])),
                "cantidad": Decimal(str(p.get("cantidad", 1)))
            }
            for p in body.get('productos', [])
        ]
        total = sum(p["precio"] * p["cantidad"] for p in productos)
        compra = {
            'tenant_id': tenant_id,
            'compra_id': str(uuid.uuid4()),
            'user_id': user_id,
            'productos': productos,
            'total': total,
            'fecha': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('t_compras1')
        table.put_item(Item=compra)

        return {
            'statusCode': 201,
            'body': json.dumps({ 'message': 'Compra registrada', 'compra': compra }, default=str)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({ 'error': str(e) })
        }