## 使用说明

### 安装依赖包
```bash
npm install
```

### 填写机器人配置，在main.js文件中，填入自己的机器人ID和密钥
main.js
```javascript
const botConfig = {
	appid: 'xxx', // qq机器人的appID (必填)
	secret: 'xxx', // qq机器人的secret (必填)
	sandbox: true, // 是否是沙箱环境 默认 false
	removeAt: true, // 移除第一个at 默认 false
	logLevel: 'info', // 日志等级 默认 info
	maxRetry: 10, // 最大重连次数 默认 10
	intents: [
		'GROUP_AT_MESSAGE_CREATE', // 群聊@消息事件 没有群权限请注释
		// 'C2C_MESSAGE_CREATE', // 私聊事件 没有私聊权限请注释
		// 'GUILD_MESSAGES', // 私域机器人频道消息事件 公域机器人请注释
		'PUBLIC_GUILD_MESSAGES', // 公域机器人频道消息事件 私域机器人请注释
		'DIRECT_MESSAGE', // 频道私信事件
		'GUILD_MESSAGE_REACTIONS', // 频道消息表态事件
		'GUILDS', // 频道变更事件
		'GUILD_MEMBERS', // 频道成员变更事件
		'DIRECT_MESSAGE', // 频道私信事件
	],
};
```

### 运行程序
```bash
npm start
```

### 此时在QQ机器人管理端的沙箱配置中，配置一个测试的群号，在群里添加该测试机器人，即可进行测试使用.

## qq-group-bot 开源库地址
[qq-group-bot 开发文档](https://lc-cn.github.io/qq-group-bot/)
