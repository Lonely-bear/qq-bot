import { ChatCompletion, Text2Image } from "@baiducloud/qianfan";
// 手动传 AK/SK 
const chat_client = new ChatCompletion({
  QIANFAN_ACCESS_KEY: 'xxx',
  QIANFAN_SECRET_KEY: 'xxx'
});

const image_client = new Text2Image({
  QIANFAN_ACCESS_KEY: 'xxx',
  QIANFAN_SECRET_KEY: 'xxx'
});

async function qianfan_chat(message) {
  const messages = [
    { role: 'user', content: message }
  ]
  try {
    return new Promise((resolve, reject) => {
      chat_client.chat({
        messages,
        system: '你是 小桃侠，由 B站UP主——烂桃侠 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。',
        temperature: 0.3,
      }, "ERNIE-Tiny-8k").then((data) => {
        resolve(data.result);
      }).catch((err) => {
        reject(err);
      });
    });
  } catch (error) {
    return error
  }
}

async function qianfan_img(prompt) {
  try {
    return new Promise((resolve, reject) => {
      image_client.text2Image({
        prompt: prompt,
        size: '768x768',
        n: 1,
        steps: 20,
        sampler_index: 'Euler a',
      }, 'Stable-Diffusion-XL').then(data => {
        const base64Image = data.data[0].b64_image;
        const dataBuffer = new Buffer(base64Image, 'base64')
        resolve(dataBuffer);
      }).catch(err => {
        reject(err);
      })
    });
  } catch (error) {
    return error
  }
}

export {
  qianfan_chat,
  qianfan_img
}