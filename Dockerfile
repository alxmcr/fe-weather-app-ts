ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

# Arguments
ARG VITE_APP_PORT
ARG VITE_FBBASE_API_KEY
ARG VITE_FBBASE_AUTH_DOMAIN
ARG VITE_FBBASE_PROJECT_ID
ARG VITE_FBBASE_STORAGE_BUCKET
ARG VITE_FBBASE_MESSAGING_SENDER_ID
ARG VITE_FBBASE_APP_ID

# Environment variables
ENV VITE_APP_PORT=${VITE_APP_PORT}
ENV VITE_FBBASE_API_KEY=${VITE_FBBASE_API_KEY}
ENV VITE_FBBASE_AUTH_DOMAIN=${VITE_FBBASE_AUTH_DOMAIN}
ENV VITE_FBBASE_PROJECT_ID=${VITE_FBBASE_PROJECT_ID}
ENV VITE_FBBASE_STORAGE_BUCKET=${VITE_FBBASE_STORAGE_BUCKET}
ENV VITE_FBBASE_MESSAGING_SENDER_ID=${VITE_FBBASE_MESSAGING_SENDER_ID}
ENV VITE_FBBASE_APP_ID=${VITE_FBBASE_APP_ID}

WORKDIR /fe-foresky-app

# copies the contents of the current directory (where the Dockerfile is located) 
# into the /fe-foresky-app directory in the container.
COPY . .

RUN npm install

# Expose the port specified by the environment variable
# - (January 2024): Vite + React (for default): `5173`
EXPOSE ${API_PORT}

CMD ["npm", "run", "dev"]