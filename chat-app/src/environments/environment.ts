export const environment = {
  production: false,

  api: {
     baseUrl: 'http://localhost:4000/api',

    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },

    chat: {
      users: '/chat/users',
      messages: '/chat/messages',
      sendMessage: '/chat/send',
    }
  }
};
