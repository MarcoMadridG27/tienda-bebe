const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 't_productos1';

exports.handler = async (event) => {

  const headers = {
    'Access-Control-Allow-Origin': '*', // Cambia '*' por tu dominio en producción
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    const producto = JSON.parse(event.body);
    const rawAuth = event.headers.Authorization || event.headers.authorization || '';
    const token = rawAuth.replace(/^Bearer\s+/i, '');

    if (!token) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Token no proporcionado' })
      };
    }



    const tokenResult = await lambda.invoke({
      FunctionName: 'api-bebes-dev-validarUsuario',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ token })
    }).promise();

    console.log('tokenResult.Payload:', tokenResult.Payload);

    const validation = JSON.parse(tokenResult.Payload);

    if (!validation.body) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Respuesta inválida de ValidarTokenUsuario' })
      };
    }

    let data;
    try {
      data = JSON.parse(validation.body);
      console.log('Parsed data from validation.body:', data);
    } catch (e) {
      console.error('Error al parsear validation.body:', validation.body);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Respuesta de validación no es JSON válido' })
      };
    }

    if (validation.statusCode === 403 || data.rol !== 'admin') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'No autorizado: solo administradores pueden crear productos' })
      };
    }

    producto.tenant_id = data.tenant_id;

    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: producto
    }).promise();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'Producto creado exitosamente' })
    };

  } catch (err) {
    console.error('ERROR en CrearProducto:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Error interno del servidor' })
    };
  }
};
