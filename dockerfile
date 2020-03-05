FROM 192.168.0.86:8000/cd_test/ubuntu_node:10.16

RUN mkdir /root/worker && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

COPY ./node_modules /root/worker/node_modules

COPY . /root/worker

WORKDIR /root/worker

# RUN npm i

ENV LD_LIBRARY_PATH /root/worker/data:/root/worker/libs

CMD chmod 777 start.sh && ./start.sh