import { Bot } from 'qq-group-bot';
import { handleGroupMessage } from './src/index.js';

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

const bot = new Bot(botConfig);
bot.start().then(() => {
	// 频道被动回复
	bot.on('message.guild', (e) => {
		e.reply('hello world')
	})
	// 频道私信被动回复
	bot.on('message.direct', (e) => {
		e.reply('hello world')
	})
	// 群聊被动回复
	bot.on('message.group', handleGroupMessage)
	// 私聊被动回复
	bot.on('message.private', (e) => {
		e.reply('hello world')
	})
	// 主动发送频道消息
	bot.sendGuildMessage(channel_id, 'hello')
	// 主动发送群消息
	bot.sendGroupMessage(group_id, 'hello')
	// 主动发送私聊消息
	bot.sendPrivateMessage(user_id, 'hello')
	// 主动发送频道消息，注：需要先调用bot.createDirectSession(guild_id,user_id)创建私信会话，此处传入的guild_id为创建的session会话中返回的guild_id
	bot.sendDirectMessage(guild_id, 'hello')
})