FROM land007/node:latest

MAINTAINER Yiqiu Jia <yiqiujia@hotmail.com>

#RUN . $HOME/.nvm/nvm.sh && cd / && npm install wxcrypt xml2js

RUN echo $(date "+%Y-%m-%d_%H:%M:%S") >> /.image_times && \
	echo $(date "+%Y-%m-%d_%H:%M:%S") > /.image_time && \
	echo "land007/acme-proxy" >> /.image_names && \
	echo "land007/acme-proxy" > /.image_name

ADD node/server.js /node_

ENV SERVER_NAME=xxx.dynv6.net\
	ACME_PROXY_URL=https://acme-http-proxy.certcloud.cn/http-challenge/J2bueKCClUNUNGp\
	WELL_KNOWN=/.well-known/acme-challenge/

#docker build -t land007/acme-proxy .
#docker rm -f acme-proxy; docker run -it --rm --name acme-proxy land007/acme-proxy:latest
#> docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t land007/acme-proxy:latest --push .
#> docker buildx build --platform linux/amd64,linux/arm/v7 -t land007/acme-proxy --push .
