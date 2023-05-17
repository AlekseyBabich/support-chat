FROM node:18
RUN mkdir -p /opt/support-chat && chown -R node:node /opt/support-chat
WORKDIR /opt/support-chat
USER node
COPY --chown=node:node package.json tsconfig.json ./
RUN yarn config delete proxy
RUN yarn install --frozen-lockfile
RUN yarn frontend-build
COPY --chown=node:node src ./src
CMD [ "yarn", "frontend" ]
