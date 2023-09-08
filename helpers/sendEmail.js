const ElasticEmail = require("@elasticemail/elasticemail-client");
const { EmailMessageData, EmailRecipient, BodyPart } = ElasticEmail;

require("dotenv").config();

const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = async (data) => {
    const email = new EmailMessageData({
      Recipients: [new EmailRecipient(data.to)],
      Content: {
        Body: [
          new BodyPart({
            ContentType: "HTML",
            Content: data.htmlContent,
          }),
        ],
        Subject: data.subject,
        From: EMAIL_FROM,
      },
    });

    await api.emailsPost(email);
    return true;
};

module.exports = sendEmail;
