import { sendSmsAlerts } from "src/services/utils/smsAlertSender";

export const handler = async (event: AWSLambda.SNSEvent) => {
  const message = event.Records[0].Sns.Message;
  const phoneNumbers = JSON.parse(message) as string[];

  await sendSmsAlerts(phoneNumbers);
};
