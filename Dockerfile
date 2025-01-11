FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

RUN mkdir -p /var/lib/todoapp

ENV NODE_ENV=production
RUN bun run build
RUN bunx --bun drizzle-kit migrate

FROM oven/bun:1-alpine AS release

COPY --chown=bun:bun --from=install /temp/prod/node_modules node_modules
COPY --chown=bun:bun --from=prerelease /usr/src/app/dist .
COPY --chown=bun:bun --from=prerelease /var/lib/todoapp/ /var/lib/todoapp/

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "index.js" ]
