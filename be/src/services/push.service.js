const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/subscriptions.json');

// Put your VAPID keys:
webpush.setVapidDetails(
  "mailto:admin@example.com",
  "BFEH7J-sGs59lQXzv_5okHvcKxiJ6_Cg4SGKWpzRNYB3uFGCdUKAilXBMAvgQQhmztOLtBLDFZN0Ym-gE3pW3NI",
  "1BJDoAjYe6y3zo1v8l4QiPwny7d6AN6qcsaEt_Om6Pg"
);

exports.sendPushToAll = (payload) => {

 

  if (!fs.existsSync(dbPath)) return;
  const subs = JSON.parse(fs.readFileSync(dbPath));
  console.log("Sending push to subscriptions:", subs);
  subs.forEach(sub => {
    webpush.sendNotification(sub, JSON.stringify(payload))
      .catch(err => console.log("Push error:", err));
  });
};
