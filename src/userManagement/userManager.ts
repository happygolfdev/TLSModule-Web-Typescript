interface UserManager<T> {
  KEY: String;
  getUser(): T | null;
  setUser(user: T): void;
  resetToken(newToken: String): void;
}

export { UserManager };
