// Libraries
import _map from "lodash/map";

// Components
import {
  UndoButton,
  RedoButton,
  BoldButton,
  ItalicButton,
  UnderLineButton,
  ClearButton,
  CodeButton,
} from "./buttons";

// Constants
import { ACTION_TYPES, FONT } from "../../constants";

// Map for field to Button Component conversion
export const ButtonVsField = {
  [ACTION_TYPES.UNDO]: UndoButton,
  [ACTION_TYPES.REDO]: RedoButton,
  [ACTION_TYPES.BOLD]: BoldButton,
  [ACTION_TYPES.ITALIC]: ItalicButton,
  [ACTION_TYPES.UNDERLINE]: UnderLineButton,
  [ACTION_TYPES.CLEAR]: ClearButton,
  [ACTION_TYPES.CODE]: CodeButton,
};

// The styles in the tool bar
export const toolBarConfig = [
  { field: ACTION_TYPES.UNDO },
  { field: ACTION_TYPES.REDO },
  { field: ACTION_TYPES.BOLD },
  { field: ACTION_TYPES.ITALIC },
  { field: ACTION_TYPES.UNDERLINE },
  { field: ACTION_TYPES.CODE },
  { field: ACTION_TYPES.CLEAR },
];

// The Tool Bar to use font styles
export const ToolBar = ({
  handleAction,
  toolBarState,
}: {
  handleAction: (action: string) => void;
  toolBarState: FONT;
}) => {
  // Using a loop here to get all the buttons out with respect to the field name
  return (
    <div className="bg-white mr-8 p-4 text-center flex flex-col justify-center items-center">
      {_map(toolBarConfig, ({ field }) => {
        const Button = ButtonVsField[field];
        const isEnabled = toolBarState[field as keyof FONT];
        return (
          <div
            className={`group hover:bg-slate-400 my-1 h-12 w-12 rounded-md flex justify-center items-center ${
              isEnabled ? "bg-slate-200" : ""
            }`}
            onClick={() => handleAction(field)}>
            <Button className="w-6 h-6 group-hover:text-white" />
          </div>
        );
      })}
    </div>
  );
};
