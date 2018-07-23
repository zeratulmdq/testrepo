FROM nginx

# Set env vars
ENV NODE_ENV=production

# We will expose port 80
EXPOSE 80

# Copy nginx custom config file
COPY ci/nginx.conf /etc/nginx/conf.d/default.conf

# Copy scripts and grant exec
COPY ci/scripts /tmp/ci
RUN chmod -R +x /tmp/ci

# Install OS dependencies
RUN /tmp/ci/os_dependencies.sh

# Create nodejs app directory and copy files to it
RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# Set everything up
CMD /tmp/ci/node_app.sh && nginx -g 'daemon off;'