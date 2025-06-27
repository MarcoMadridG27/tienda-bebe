const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 't_productos1';

exports.handler = async (event) => {
  try {
    const { producto_id } = JSON.parse(event.body || '{}');
    const token = event.headers.Authorization || event.headers.authorization;

    if (!token) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Token no proporcionado' })
      };
    }

    if (!producto_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Falta producto_id' })
      };
    }
    const tokenResult = await lambda.invoke({
      FunctionName: 'api-bebes-dev-validarUsuario',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ token })
    }).promise();

    const validation = JSON.parse(tokenResult.Payload);

    if (!validation.body) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Respuesta inválida de ValidarTokenUsuario' })
      };
    }

    const data = JSON.parse(validation.body);

    if (validation.statusCode === 403 || data.rol !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'No autorizado: solo administradores pueden eliminar productos' })
      };
    }

    const result = await dynamodb.scan({
      TableName: TABLE_NAME,
      FilterExpression: 'producto_id = :pid',
      ExpressionAttributeValues: { ':pid': producto_id }
    }).promise();

    const item = result.Items[0];
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Producto no encontrado' })
      };
    }

    await dynamodb.delete({
      TableName: TABLE_NAME,
      Key: {
        tenant_id: item.tenant_id,
        producto_id: producto_id
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Producto eliminado exitosamente' })
    };

  } catch (err) {
    console.error('ERROR en EliminarProducto:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Error interno del servidor' })
    };
  }
};