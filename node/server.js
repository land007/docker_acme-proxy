const express = require('express');
const https = require('https');

const app = express();

const PORT = 80;
const SERVER_NAME = process.env['SERVER_NAME'] || 'xxx.dynv6.net';
console.log('SERVER_NAME', SERVER_NAME);
const ACME_PROXY_URL = process.env['ACME_PROXY_URL'] || 'https://acme-http-proxy.certcloud.cn/http-challenge/J2bueKCClUNUNGp';
console.log('ACME_PROXY_URL', ACME_PROXY_URL);
const WELL_KNOWN = process.env['WELL_KNOWN'] || '/.well-known/acme-challenge/';
console.log('WELL_KNOWN', WELL_KNOWN);


app.use(WELL_KNOWN, (req, res) => {
    console.log('Request Method:', req.method); // 输出请求方法
    console.log('Request Path:', req.path); // 输出请求的路径
    console.log('Query Parameters:', req.query); // 输出查询参数
    console.log('Request Headers:', req.headers); // 输出请求头部

    const targetUrl = `${ACME_PROXY_URL}${req.path}`;

    // 发起对目标 URL 的请求
    https.get(targetUrl, (proxyRes) => {
        let data = '';

        // 收到数据时进行拼接
        proxyRes.on('data', (chunk) => {
            data += chunk;
        });

        // 响应结束时输出数据并将其传递给客户端
        proxyRes.on('end', () => {
            console.log('Response from target server:', data); // 输出响应内容
            res.send(data); // 将响应内容传递给客户端
        });
    }).on('error', (err) => {
        // 处理请求错误
        console.error('Proxy request error:', err);
        res.status(500).send('Proxy request failed');
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Server name: ${SERVER_NAME}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});