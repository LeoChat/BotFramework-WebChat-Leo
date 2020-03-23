# BotFramework-WebChat (LeO edition)

This project is a wrap for [BotFramework-WebChat](https://github.com/microsoft/BotFramework-WebChat) that includes:

- Custom activity handlers.
- Custom layouts / attachments.
- Custom style-sets.
- Custom locales.
- Customizable agent header.

There's a lot of emphasis on the architecture in this project, it's purpose is to serve as a working ground for a greater, much more robust web-chat to come. A good example for handling a custom activity and rendering it on screen can be found at [Wow activity middleware](./src/activityMiddleware/wowActivityMiddleware.js).

### Things you should know

- You cannot use [CSS vars](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) if you would like to support Internet Explorer 11.
- You should use [web-chat LeO state](./src/wcLeoState.js) if you would like incoming activities to affect the global layout of the app e.g. header color and input placeholder.
- Although not documented, you can gather accepted web-chat React props from [BasicWebChat](https://github.com/microsoft/BotFramework-WebChat/blob/1470e08466760db92ee1a8ac80a5b0236b5b35ee/packages/component/src/BasicWebChat.js#L180) and [Composer](https://github.com/microsoft/BotFramework-WebChat/blob/1470e08466760db92ee1a8ac80a5b0236b5b35ee/packages/component/src/Composer.js#L348) (a combination of both).
