module.exports = {
    env: 'asd',
    db: {
        redis: {
            host: '192.168.0.154',
            port: 6379,
            password: '',
            db: 0
        },
        mongo: 'mongodb://192.168.0.154:27017/aa',
    },
    protocol: 'http', // https
    tls: {
        key: 'path',
        cert: 'path'
    },
    port: 999,
};
