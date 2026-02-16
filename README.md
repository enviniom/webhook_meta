# webhook_meta
Server para webhook meta

## Descripción
Servidor Express para manejar webhooks de Meta (Facebook). Este servidor proporciona endpoints para verificar y recibir eventos de webhooks.

## Instalación

```bash
npm install
```

## Configuración
Crea un archivo `.env` basado en `.env.example` y configura tu token de verificación:

```bash
cp .env.example .env
```

Edita el archivo `.env` y establece tu token de verificación:
```
VERIFY_TOKEN=tu_token_secreto
PORT=3000
```

## Uso

Inicia el servidor:
```bash
npm start
```

El servidor estará escuchando en el puerto configurado (por defecto 3000).

## Endpoints

### GET /
Endpoint de verificación del webhook. Meta (Facebook) utiliza este endpoint para verificar la configuración del webhook.

**Parámetros de query:**
- `hub.mode`: Debe ser "subscribe"
- `hub.challenge`: El challenge que se debe devolver
- `hub.verify_token`: El token de verificación configurado

**Respuesta exitosa:** 200 con el challenge
**Respuesta fallida:** 403

### POST /
Endpoint para recibir eventos del webhook. Todos los eventos enviados por Meta llegarán a este endpoint.

**Respuesta:** 200 con "EVENT_RECEIVED"
