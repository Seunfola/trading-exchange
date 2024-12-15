import { NextApiRequest, NextApiResponse } from "next";

const updateUserSettings = async (userId: string, settings: any) => {
  // Mock database save operation
  console.log(`Saving settings for user ${userId}:`, settings);
  return { success: true };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { emailNotifications, smsNotifications, themePreference } = req.body;

    // Validate the user ID (mocked for this example)
    const userId = req.headers.authorization; // Replace with your actual user authentication/authorization logic
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Save the settings to the database
      const result = await updateUserSettings(userId, {
        emailNotifications,
        smsNotifications,
        themePreference,
      });

      if (result.success) {
        res.status(200).json({ message: "Settings saved successfully" });
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Only POST method is allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
