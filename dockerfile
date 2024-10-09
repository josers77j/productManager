# Usar una imagen base de Node.js
FROM node:20

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el contenido de tu proyecto al contenedor
COPY . .

# Exponer los puertos necesarios
EXPOSE 3000 5173

# Comando por defecto que se ejecuta
CMD ["npm", "run", "dev"]
