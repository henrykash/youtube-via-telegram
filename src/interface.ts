interface SearchParams {
  searchString: string;
  type: string;
  feature?: string;
  duration?: number;
  sort_by?: string;
}
interface SearchResult {
  type: string;
  title: string;
  playlistID: string;
  url: string;
  firstVideo: Array<Object>;
  owner: Array<Object>;
  publishedAt: string;
  length: number;
}
export { SearchParams, SearchResult };
