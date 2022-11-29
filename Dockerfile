FROM node:12.22.3-alpine3.11
RUN apk add jq

WORKDIR /app
COPY node_modules /app/node_modules
COPY dist /app/

RUN adduser -s /bin/sh -D ptc
USER ptc 
EXPOSE 8080
# ENTRYPOINT ["docker-entrypoint.sh"]
# CMD ["sleep","3600"]
CMD ["node", "src/server.js"]