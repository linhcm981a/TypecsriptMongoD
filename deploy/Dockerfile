FROM node:12.22.3-alpine3.11

ARG DIST_FILE
ARG NODE_MODULES

WORKDIR /app
COPY ${NODE_MODULES} /app/node_modules/
COPY ${DIST_FILE} /app/

RUN apk add jq

COPY deploy/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /

RUN adduser -s /bin/sh -D ptc
USER ptc 

ENTRYPOINT ["docker-entrypoint.sh"]
CMD node src/server.js