/*module.exports = {
	devServer: {
		// 设置主机地址
		host: 'localhost',
		// 设置默认端口
		port: 8080,
		// 设置代理
		proxy: {
			'/http://testnet1.everitoken.io:8888/v1': {
				// 目标 API 地址
				target: 'http://testnet1.everitoken.io:8888/',
        pathRewrite: {
          '^/http://testnet1.everitoken.io:8888/v1': '/http://testnet1.everitoken.io:8888/v1'
        },
				// 如果要代理 websockets
				ws: true,
				// 将主机标头的原点更改为目标URL
				changeOrigin: false
			}
		}
	}
}*/
module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
}
