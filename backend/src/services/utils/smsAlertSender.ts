import twilioSmsSender from "./twilioSmsSender";

export const sendSmsAlerts = async (phoneNumbers: string[]) => {
  for (const number of phoneNumbers) {
    await twilioSmsSender.sendMessage(
      `PhotoDrop: your photos have dropped. Check them out here: https://fullstack-photo-drop-users.vercel.app`,
      `+${number}`
    );
  }
};
