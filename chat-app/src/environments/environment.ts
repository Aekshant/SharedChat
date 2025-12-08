export const environment = {
  production: false,
  fileUrl: 'http://localhost:4000',

  api: {
     baseUrl: 'http://localhost:4000/api',
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },

    chat: {
      users: '/chat/users',
      messages: '/chat/messages',
      sendMessage: '/message/send',
      insertMessage: '/message/insertmessage',
      getChatHistory:'/message/chathistory'
    },
    profile : {
      userById: '/user'
    }
  }
};
