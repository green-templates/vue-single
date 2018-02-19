- [前端开发环境配置](#%E5%89%8D%E7%AB%AF%08%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)
  - [安装 node](#%E5%AE%89%E8%A3%85-node)
  - [安装 cnpm](#%E5%AE%89%E8%A3%85-cnpm)
  - [安装 chrome 代理插件(推荐)](#%E5%AE%89%E8%A3%85-chrome-%E4%BB%A3%E7%90%86%E6%8F%92%E4%BB%B6%E6%8E%A8%E8%8D%90)
  - [安装 [vscode](https://code.visualstudio.com/)(推荐)](#%E5%AE%89%E8%A3%85-vscodehttpscodevisualstudiocom%E6%8E%A8%E8%8D%90)
    - [插件安装](#%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85)
    - [插件介绍](#%E6%8F%92%E4%BB%B6%E4%BB%8B%E7%BB%8D)

# 前端开发环境配置

## 安装 node
使用 [nvm](https://github.com/creationix/nvm) 进行版本管理  
参考 https://www.cnblogs.com/kaiye/p/4937191.html

1.卸载已安装到全局的 node/npm，没有可跳过
```bash
# 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
npm ls -g --depth=0

# 删除全局 node_modules 目录
sudo rm -rf /usr/local/lib/node_modules 

# 删除 node
sudo rm /usr/local/bin/node

# 删除全局 node 模块注册的软链
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm
```

2.安装 [nvm](https://github.com/creationix/nvm#installation)

3.`nvm` 安装 `node` 对应版本
```bash
# 安装对应版本
nvm install 6.11.4

# 使用对应版本
nvm use 6.11.4

# 设置默认版本，保持新建终端窗口后版本一致
nvm alias default 6.11.4
```

## 安装 cnpm
[淘宝 NPM 镜像](http://npm.taobao.org/)，加快依赖包安装速度，之后统一使用 `cnpm` 命令

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 安装 chrome 代理插件(推荐)
> 小飞机全局代理后，node 本地开发服务器会挂掉

1. 安装 [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?utm_source=chrome-ntp-icon)

2. 新建情景模式，选择 pac，输入pac网址 `https://raw.githubusercontent.com/JackFGreen/gfw_whitelist/master/OmegaProfile_PAC.pac`，点击立即更新

3. 插件模式选择 `pac`

## 安装 [vscode](https://code.visualstudio.com/)(推荐)

### 插件安装
1. 安装 [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) 插件
2. `cmd + shift + p` 唤起 `vscode` 命令面板
3. 输入 `sync`，选择 `download`
4. 此时会打开 `github`，需要创建 `Personal Access Token`，见插件官网
5. 在 `vscode` 命令面板输入刚创建的 `token`，回车
6. 此时会要求输入同步的 `Gist ID`，此 id 人手人份，输入谁的就会同步谁的配置，请先输入 `b4b3d66b76a59385f303971cc42d95b1` 保证代码风格统一，之后可自行更换，回车
7. 等待配置及插件下载
8. 修改文件注释头信息，`cmd + ,` 修改 `fileheader.Author` `fileheader.LastModifiedBy`，请把 `你的名字` 贴上去，之后 `ctrl + alt + i` 添加注释信息
9. 上传配置到个人 `gist`，完成后会有输出提示，并且会分配个人 `Gist ID`，替换之前的 id 后就可以同步你的个人配置了，替换方法 `cmd + ,`，搜索 `sync.gist` 字段替换
10. 插件同步有时候会不稳定，如果 `.vue` 文件 `没有高亮` 请自行安装 `vetur` 插件

### 插件介绍

- beautify  
格式化代码，`alt + f`，配置文件 `.jsbeautifyrc`  
缺陷：格式化后函数名和括号之间不会有空格，`eslint` 会报 `space-before-function-paren` 错误，需要手动修复

- EditorConfig for Visual Studio Code  
统一 `vscode` 编辑器配置，如空格，换行等，配置文件 `.editorconfig`

- file utils  
文件操作，删除，副本，移动等

- git history  
`git` 历史，可查看某一文件的历史，并对比不同版本等

- JavaScript Standard Style  
`standard` 风格插件

- JavaScript standardjs styled snippets  
`standard` 风格代码片段

- markdown all in one  
`markdown` 格式插件

- open-in-browser  
浏览器中打开 `html`

- path intellisense  
文件路径提示

- predawn theme kit  
`vsocde` 主题

- project manager  
项目管理，可添加文件夹快速打开

- settings sync  
同步 `vscode` 配置到 `gist`

- todo tasks  
添加 `.todo` 文件支持

- todo parser  
解析项目中带有 `todo` 字段的文件

- vetur  
`Vue` 代码高亮，代码提示等

- vscode-fileheader  
添加文件注释头信息，`ctrl + alt + i`
