# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo en la carpeta de la aplicación Angular
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto 4200 (o el puerto que uses para la aplicación Angular)
EXPOSE 4200

# Comando para iniciar la aplicación cuando el contenedor se ejecute
CMD ["npm", "start"]