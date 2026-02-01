export type TimelineItemType = 'photo' | 'quote' | 'memory';

export interface TimelinePhoto {
  id: string;
  type: 'photo';
  content: string;
  image?: string;
  caption: string;
  date: string;
}

export interface TimelineQuote {
  id: string;
  type: 'quote';
  content: string;
  author: string;
}

export interface TimelineMemory {
  id: string;
  type: 'memory';
  title: string;
  content: string;
  emoji: string;
}

export type TimelineItemData = TimelinePhoto | TimelineQuote | TimelineMemory;
