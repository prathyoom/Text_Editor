export const PAGES = {
  HOME: "HOME_PAGE",
  EDITOR: "EDITOR_PAGE",
};

export const ACTION_TYPES = {
  BOLD: "BOLD",
  ITALIC: "ITALIC",
  UNDERLINE: "UNDERLINE",
  UNDO: "UNDO",
  REDO: "REDO",
  CLEAR: "CLEAR",
  CODE: "CODE",
};

export type FONT = {
  BOLD: boolean;
  ITALIC: boolean;
  UNDERLINE: boolean;
  CODE: boolean;
};

export const INITIAL_FONT = {
  [ACTION_TYPES.BOLD]: false,
  [ACTION_TYPES.ITALIC]: false,
  [ACTION_TYPES.UNDERLINE]: false,
  [ACTION_TYPES.CODE]: false,
} as FONT;
