import boto3
import hashlib
import uuid
import json
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo  

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def lambda_handler(event, context):
    body = json.loads(event['body'])
    tenant_id = body['tenant_id']
    user_id = body['user_id']
    password = body['password']

    hashed_password = hash_password(password)
    dynamodb = boto3.resource('dynamodb')
    t_usuarios = dynamodb.Table('t_usuarios2')

    response = t_usuarios.get_item(Key={
        'tenant_id': tenant_id,
        'user_id': user_id
    })

    if 'Item' not in response:
        return {
            'statusCode': 403,
            'body': json.dumps({'error': 'Usuario no existe'})
        }

    hashed_password_bd = response['Item']['password']
    if hashed_password != hashed_password_bd:
        return {
            'statusCode': 403,
            'body': json.dumps({'error': 'Contraseña incorrecta'})
        }

    lima_time = datetime.now(ZoneInfo("America/Lima"))
    fecha_hora_exp = lima_time + timedelta(hours=1)

    t_tokens = dynamodb.Table('t_tokens_acceso1')
    token = str(uuid.uuid4())
    t_tokens.put_item(Item={
        'token': token,
        'expires': fecha_hora_exp.strftime('%Y-%m-%d %H:%M:%S'),
        'tenant_id': tenant_id,
        'user_id': user_id
    })


    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Login exitoso',
            'token': token,
            'expires': fecha_hora_exp.strftime('%Y-%m-%d %H:%M:%S'),
            'user_id': user_id,
            'tenant_id': tenant_id
        })
    }
