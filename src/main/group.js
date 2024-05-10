import { qianfan_chat, qianfan_img } from "../AI/index.js"
import axios from "axios"
import fs from 'fs'
import request from 'request'

const directives = [
  { name: '/生成二维码', handler: handleGenQrcode },
  { name: '/历史上的今天', handler: handleHistoryToday },
  { name: '/舔狗日记', handler: handleDog },
  { name: '/中英互译', handler: handleTranslate },
  { name: '/AI绘图', handler: handleAIImage },
]

/**
 * 生成二维码
 * @param {*} text 
 * @returns
 */
export async function handleGenQrcode(text) {
  const filename = `${Date.now()}.png`
  const url = encodeURI(`https://api.oick.cn/api/qrcode?text=${text}&size=100px`)
  console.log(url)
  await request(url).pipe(fs.createWriteStream(`assets/qrcode/${filename}`));
  return {
    type: 'image',
    file: `https://xxx/assets/qrcode/${filename}`  // 填入你自己的服务器域名的项目地址
  }
}

/**
 * 历史上的今天
 * @returns 
 */
export async function handleHistoryToday() {
  const data = await axios.get('https://api.oick.cn/api/lishi').then(res => res.data)
  const text = data?.result.map(item => {
    return `${item.date}，${item.title}`
  }).join('\n')
  return '历史上的今天：\n' + text
}

/**
 * 舔狗日记
 * @returns 
 */
export async function handleDog() {
  const data = await axios.get("https://api.oick.cn/api/dog").then(res => res.data)
  return '舔狗日记：\n' + data
}

/**
 * 中英互译
 * @param {*} text 
 * @returns 
 */
export async function handleTranslate(text, e) {
  e.reply("[]~(￣▽￣)~*小桃侠正在努力翻译中哦~")
  const data = await axios.get(`https://api.oick.cn/api/fanyi?text=${text}`).then(res => res.data)
  return '翻译结果：\n' + data.data.result
}

/**
 * AI绘图
 * @param {*} prompt 
 * @returns 
 */
export async function handleAIImage(prompt, e) {
  e.reply("[]~(￣▽￣)~*小桃侠正在努力绘画中哦~")
  const data = await qianfan_img(prompt)
  const filename = `${Date.now()}.png`
  await fs.promises.writeFile(`assets/stable/${filename}`, data)
  return {
    type: 'image',
    file: `https://xxx/assets/stable/${filename}` // 填入你自己的服务器域名的项目地址
  }
}

/**
 * 群聊消息处理
 * @param {*} e 
 * @returns 
 */
export async function handleGroupMessage(e) {
  const message_text = e.message.find(i => i.type === 'text').text.trim()
  const message_image = e.message.find(i => i.type === 'image')
  const message_face = e.message.find(i => i.type === 'face')
  for (let i = 0; i < directives.length; i++) {
    if (message_text.includes(directives[i].name)) {
      const directive_param = message_text.replace(directives[i].name, '').trim()
      const data = await directives[i].handler(directive_param, e)
      if (data) {
        e.reply(data)
        return
      } else {
        e.reply('指令错误，请重新输入')
        return
      }
    }
  }
  if (message_image || message_face) {
    e.reply('🤔我暂时还理解不了除了文字以外的信息~')
    return
  }
  if (message_text.length > 100) {
    e.reply('🤔我暂时还理解不了这么长的内容~')
    return
  }
  if (message_text.length < 1) {
    e.reply('😁您好~\n我是 小桃侠，请问有什么可以帮您的吗？')
    return
  }
  e.reply('🤔让我思考一下哦~')
  const data = await qianfan_chat(e.message[0].text)
  const reply = `根据您提出的内容，经过我的判断，给出的回答是：\n${data}`
  e.reply(reply)
}