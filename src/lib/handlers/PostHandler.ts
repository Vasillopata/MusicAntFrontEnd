export interface Post {
    id: number;
    title: string;
    text: string;
    image: ArrayBuffer;
    userId: number;
    communityId: number|null;
}