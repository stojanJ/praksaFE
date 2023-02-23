export default interface IMovie {
  id?: number;
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  genre: Array<string> | undefined;
  user_id: number;
  like?: Array<object> | undefined;
  view?: Array<object> | undefined;
  comment?: Array<object> | undefined;
}
