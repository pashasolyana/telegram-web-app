const TelegramBot = require('node-telegram-bot-api');

const token = '5619524337:AAGOEv_y0OWkMWkVPpmz2aHDROTvEUmGpL4';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Добро пожаловать в бота для обработки показаний счетчиков", {
    "reply_markup": {
        "inline_keyboard": [[{
            text : 'Web-app',
            web_app : {url : 'https://pashasolyanaapp.ru/'}
        }]]
        }
    });
});