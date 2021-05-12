const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { spawnSync } = require('child_process');
const findChrome = require('chrome-finder');
const EndWebpackPlugin = require('end-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const outputPath = path.resolve(__dirname, 'docs');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: 'base64-inline-loader',
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./src/index.html',
      minify:{//压缩html
          collapseWhitespace:true,
          removeComments:true
      }
    }),
    new EndWebpackPlugin(async () => {
      // 自定义域名
      // fs.writeFileSync(path.resolve(outputPath, 'CNAME'), 'https://free.sanmzh.xyz/resume');
      // await publishGhPages();

      // 调用 Chrome 渲染出 PDF 文件
      const chromePath = findChrome();
      spawnSync(chromePath, ['--headless', '--disable-gpu', `--print-to-pdf=${path.resolve(outputPath, 'resume.pdf')}`,
        'https://sanm-zh.gitee.io/resume/' // 这里注意改成你的在线简历的网站
      ]);

      // 重新发布到 ghpages
      // await publishGhPages();
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: './static',
        ignore: ['.*']
      }
   ])
  ]
}