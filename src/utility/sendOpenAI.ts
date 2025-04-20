// openaiService.js
import axios from "axios";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig.extra.OPEN_AI_API_KEY;

export const sendOpenAI = async (userMessage, threadId, assistantId) => {
  console.log("AssitantId Is:" + assistantId);
  try {
    // Step 1: Create a thread if not already created
    if (!threadId) {
      const threadRes = await axios.post(
        "https://api.openai.com/v1/threads",
        {},
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );
      threadId = threadRes.data.id;
    }

    // Step 2: Add user message to thread
    await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: "user",
        content: userMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    // Step 3: Run the assistant
    const runRes = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        assistant_id: assistantId,
        model: "gpt-4o-mini",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const runId = runRes.data.id;

    // Step 4: Poll for the run to complete
    let status = "queued";
    while (
      status !== "completed" &&
      status !== "failed" &&
      status !== "cancelled"
    ) {
      const runStatusRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          headers: {
            "OpenAI-Beta": "assistants=v2",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      status = runStatusRes.data.status;
      if (status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s
      }
    }

    // Step 5: Get messages from thread
    const messagesRes = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        headers: {
          "OpenAI-Beta": "assistants=v2",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const messages = messagesRes.data.data;
    const assistantReply = messages.find((msg) => msg.role === "assistant")
      ?.content[0]?.text?.value;

    return assistantReply || "Assistant did not reply.";
  } catch (error) {
    console.error("Assistant error:", error.response?.data || error.message);
    return "Something went wrong.";
  }
};

export const createNewThread = async () => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/threads",
      {},
      {
        headers: {
          "OpenAI-Beta": "assistants=v2",
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const threadId = response.data.id;
    return threadId;
  } catch (err) {
    console.error("Error creating thread:", err.response?.data || err.message);
    return null;
  }
};
