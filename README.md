# Servicio de Tokenización de Tarjetas

Este repositorio contiene el Servicio de Tokenización de Tarjetas, una aplicación Node.js que proporciona funcionalidad de tokenización de tarjetas. Este servicio permite a los usuarios tokenizar información de tarjetas de crédito para su almacenamiento y recuperación segura.

## Empezando

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (incluyendo npm)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/install/standalone/)

### Clonar el Repositorio

```bash
git clone https://github.com/EnzoVM/card-tokenization-service.git
cd card-tokenization-service
```
### Ejecutar Localmente (Con Redis Instalado)
#### 1. Instalar Dependencias:
```bash
npm install
```
#### 2. Variables de Entorno:
Crea un archivo .env en la raíz del proyecto. Puedes utilizar el archivo .env.example proporcionado como plantilla. Aqui te doy unos ejemplos para que puedas iniciar.
```bash
TOKEN_SECRET_KEY=####

REDIS_HOST=localhost
REDIS_LOCAL_PORT=6380
REDIS_DOCKER_PORT=6379

NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000
```
#### 3. Iniciar redis
Asegúrate de que Redis esté instalado y en ejecución, o utiliza una imagen de Docker:
```bash
docker run --name redis -d -p 6379:6379 redis
```
#### 4. Iniciar la Aplicación:
```bash
npm run start
```
### Ejecutar Localmente (Con Docker-compose)
#### 1. Variables de Entorno:
Crea un archivo .env en la raíz del proyecto. Puedes utilizar el archivo .env.example proporcionado como plantilla. Aqui te doy unos ejemplos para que puedas iniciar.
```bash
TOKEN_SECRET_KEY=####

REDIS_HOST=redis_database
REDIS_LOCAL_PORT=6380
REDIS_DOCKER_PORT=6379

NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000
```
#### 2. Iniciar la Aplicación:
```bash
npm run dev
```
### Realizar pruebas unitarias (Con Jest)
#### 1. Instalar Dependencias:
```bash
npm install
```
#### 2. Ejecutar Pruebas:
```bash
npm run test
```