export interface IMessage {
  id: string;
  text: string;
  date: number;
  senderId: number;
  recipientId: number;
}

export type IMessages = IMessage[];
