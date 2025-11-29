const fs = require('fs');
const path = require('path');
const pushService = require('../services/push.service');

exports.saveSubscription = (req, res) => {
  const subscription = req.body;

  const dbPath = path.join(__dirname, '../db/subscriptions.json');
  let subs = [];

  if (fs.existsSync(dbPath)) {
    subs = JSON.parse(fs.readFileSync(dbPath));
  }

  // Avoid duplicates
  if (!subs.find(s => s.endpoint === subscription.endpoint)) {
    subs.push(subscription);
    fs.writeFileSync(dbPath, JSON.stringify(subs, null, 2));
  }

  res.status(201).json({ message: "Subscription saved!" });
};


exports.sendNotification = (req, res) => {
  console.log("reqbody" , req.body)
  const { title, body, senderId } = req.body;
  pushService.sendPushToAll({
    title,
    body,
    senderId
  });

  res.json({ message: "Notification sent" });
};
