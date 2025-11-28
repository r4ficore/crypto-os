export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
  timestamp?: string;
};

export type EngineChatContext = {
  id: string;
  name: string;
  description: string;
};
