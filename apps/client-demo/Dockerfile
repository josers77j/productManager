# Dockerfile para el frontend (Vite)
FROM node:20

# Establece el directorio de trabajo
WORKDIR /apps/client-demo

# Copia los archivos de package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del frontend
RUN npm install --legacy-peer-deps

# Copia el resto del código del frontend
COPY . .

# Exponer el puerto en el que correrá el servidor
EXPOSE 3000

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
