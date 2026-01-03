import readline from "node:readline/promises";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";

dotenv.config();

const tvly = tavily(process.env.TAVILY_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages = [
    {
      role: "system",
      content:
        "You are personal assistant which help to solve the user problems and answer the queations. You have access to following tools: 1. searchweb({query}: {query: string})",
    },
    // {
    //     role: 'user',
    //     content: 'when Iphone 18 will be released?'
    // }
  ];

  while (true) {
    const question = await rl.question("You:");
    // bye
    if (question === "bye") {
      break;
    }

    messages.push({
      role: "user",
      content: question,
    });
    while (true) {
      const completions = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: messages,
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Get current weather for a location ",
              parameters: {
                // JSON Schema object
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "City and state, e.g. San Francisco, CA",
                  },
                },
                required: ["query"],
              },
            },
          },
        ],
        tool_choice: "auto",
      });
      messages.push(completions.choices[0].message);
      const toolCalls = completions.choices[0].message.tool_calls;
      if (!toolCalls) {
        console.log(`Assistant: ${completions.choices[0].message.content}`);
        break;
      }
      for (const tool of toolCalls) {
        console.log("tool: ", tool);
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;
        if (functionName === "get_weather") {
          const toolResult = await webSearch(JSON.parse(functionParams));
          console.log("toolResult: ", toolResult);
          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
      // console.log(JSON.stringify(completions2.choices[0].message, null, 2));
    }
  }
}

main();

async function webSearch({ query }) {
  console.log("Searching web for: ", query);

  const response = await tvly.search(query);
  console.log("response: ", response);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");
  // console.log('finalResult: ', finalResult);

  return finalResult;
}
