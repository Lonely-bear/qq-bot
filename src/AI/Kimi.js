import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://api.moonshot.cn/v1",
  apiKey: "xxx"
});

// const messages = [{
//   role: "system", content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。",
//   role: "user", content: "你好，我叫李雷，1+1等于多少？"
// }]
async function kimi_chat(message) {
  const messages = [
    { role: 'system', content: '你是 小桃侠，由 B站UP主——烂桃侠 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。' },
    { role: 'user', content: message }
  ]
  return new Promise((resolve, reject) => {
    client.chat.completions.create({
      model: "moonshot-v1-8k",
      messages,
      temperature: 0.3
    }).then(data => {
      resolve(data.choices[0].message.content)
    }).catch(err => {
      reject(err)
    })
  })
}

export {
  kimi_chat
}