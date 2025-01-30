export interface IMessage {
  id: string;
  text: string;
  sender: string;
  time: number;
}

export type IMessages = IMessage[];
