const path = require('path')
module.exports = {
    chainWebpack: (config) => {
        //     config.module
        //   .rule('svg')
        //   .test(/\.svg$/)
        //   .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .end()
        // config.module
        //     .rule('svg')
        //     .test(/\.(svg)(\?.*)?$/)
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         include: [
        //             // 将某个路径下所有svg交给 svg-sprite-loader 插件处理
        //             path.resolve(__dirname, 'src/assets/svg')
        //         ],
        //     })
    },
    // devServer: {
    //   open: true,
    //   host: '0.0.0.0',
    //   port: 8080,
    //   https: false,
    //   hotOnly: false,
    //   proxy: {
    //     '/api': {
    //       target: '<url>',
    //       ws: true,
    //       changOrigin: true
    //     }
    //   },
    //   before: app => {}
    // }
}