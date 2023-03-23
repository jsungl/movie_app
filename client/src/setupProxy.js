const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api',{
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};

/*
/api 는 프록시를 사용할 경로 (path) 로 ‘/api’로 시작하는 endpoint를 가진 api와 모두 매칭시킨다.
target 은 내가 프록시로 이용할 서버의 주소로 url의 endpoint를 제외한 출처만 명시한다.
changeOrigin은 호스트 헤더의 출처를 대상 URL로 변경 하는지 여부. 
CORS 처리를 위해 출처를 수정해주어야 합니다. 기본값은 false입니다.
proxy를 세팅하면 서버를 재시작 해주어야 합니다.
프록시 서버는 개발 환경에서만 사용할 수 있습니다.
*/