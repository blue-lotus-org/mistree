export type MistralModel = 'mistral-small-latest' | 'pixtral-12b-2409' | 'open-codestral-mamba' | 'open-mistral-nemo';

export interface Settings {
  apiKey: string;
  model: MistralModel;
}

export interface DiagramData {
  mermaid: string;
  json: string;
  type: string;
}