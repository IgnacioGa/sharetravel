export const TEXTOPTIONS = {
  unlogged: {
    title: "Unlogged",
    text: "You need to be logged in order to access to the content of this page",
    showLogin: true,
  },
  unauthorized: {
    title: "Unauthorized",
    text: "You don`t have permissions to access this page",
    showLogin: false,
  },
};

export enum STATUS {
  DRAFT = "draft",
  TOAPPROVE = "to_review",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  DELETED = "deleted",
}
