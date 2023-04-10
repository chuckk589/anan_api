export interface RequestWithUser extends Request {
  user: { username: string };
}
