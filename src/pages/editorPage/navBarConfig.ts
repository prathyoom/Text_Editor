import { ACTION_TYPES } from "../../constants";
import { BoldButton } from "./buttons/BoldButton";
import { ItalicButton } from "./buttons/ItalicButton";
import { UnderLineButton } from "./buttons/UnderLineButton";
import { UndoButton } from "./buttons/UndoButton";
import { RedoButton } from "./buttons/RedoButton";
import { CodeButton } from "./buttons/CodeButton";
import { ClearButton } from "./buttons/ClearButton";

export const ButtonVsField = {
  [ACTION_TYPES.UNDO]: UndoButton,
  [ACTION_TYPES.REDO]: RedoButton,
  [ACTION_TYPES.BOLD]: BoldButton,
  [ACTION_TYPES.ITALIC]: ItalicButton,
  [ACTION_TYPES.UNDERLINE]: UnderLineButton,
  [ACTION_TYPES.CLEAR]: ClearButton,
  [ACTION_TYPES.CODE]: CodeButton,
};

export const navBarConfig = [
  { field: ACTION_TYPES.UNDO },
  { field: ACTION_TYPES.REDO },
  { field: ACTION_TYPES.BOLD },
  { field: ACTION_TYPES.ITALIC },
  { field: ACTION_TYPES.UNDERLINE },
  { field: ACTION_TYPES.CODE },
  { field: ACTION_TYPES.CLEAR },
];
