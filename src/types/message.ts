export interface IMessage {
  id: string;
  text: string;
  sender: string;
  time: number;
  chat_id: string;
}

export type IMessages = IMessage[];
