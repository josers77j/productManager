# Dockerfile para el frontend (Vite)
FROM node:20

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el resto del código del frontend
COPY . .

RUN npm run build

# Exponer el puerto en el que correrá el servidor
EXPOSE 5173

CMD ["npm", "run", "dev"]
