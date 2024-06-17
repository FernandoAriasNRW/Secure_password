export interface Image {
  publicId: string;
  width: number;
  height: number;
  format: string;
  url: string;
  secureUrl: string;
  createdAt: string;
  eager: Eager[];
}

interface Eager {
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
}
