// Libraries
import { useEffect, useState, useCallback, useReducer } from "react";
import _map from "lodash/map";
import {
  Editor,
  EditorState,
  DraftHandleValue,
  Modifier,
  SelectionState,
} from "draft-js";

// Components
import { ToolBar } from "./ToolBar";
import { Header } from "./Header";

// Helpers
import { onAction, onKeyDown } from "./handleAction";

// CSS
import "./textEditor.css";

// Constants
import { INITIAL_FONT, FONT, ACTION_TYPES } from "../../constants";

const reducer = (
  state: FONT,
  action: { styles: string[]; isAuto: boolean }
) => {
  let curState = state;
  const { isAuto, styles } = action;
  // To handle automatic updation of toolbar
  if (isAuto) {
    curState = INITIAL_FONT;
    _map(styles, (style) => (curState = { ...curState, [style]: true }));
  }
  // To handle manual updation of a specfic style
  else
    _map(
      styles,
      (style) =>
        (curState = { ...curState, [style]: !curState[style as keyof FONT] })
    );
  return curState;
};

export const TextEditor = () => {
  // Using useReducer() hook to maintain state of the toolBar
  const [toolBarState, dispatchToolBar] = useReducer(
    reducer,
    INITIAL_FONT as FONT
  );

  // Using useState() hook to maintain state of the Editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Action handler for the editor
  const handleAction = useCallback(
    (action: string) =>
      onAction(
        action,
        editorState,
        setEditorState,
        toolBarState,
        dispatchToolBar
      ),
    [editorState, toolBarState]
  );

  // To trigger action handler with key bindings
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => onKeyDown(handleAction, e),
    [handleAction]
  );

  // To auto update Toolbar state and inline Styles before typing based on the location of the caret
  const handleBeforeInput = (
    text: string,
    editorState: EditorState
  ): DraftHandleValue => {
    // To get current content and selection of text through cursor
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    // Creating the updated content to insert the new characters at the selection position
    const updatedContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text,
      editorState.getCurrentInlineStyle()
    );

    // Creating new Editor State with updated content
    const newEditorState = EditorState.push(
      editorState,
      updatedContent,
      "insert-characters"
    );

    // Calculating new selection position after inserted text
    const newSelection = currentSelection.merge({
      anchorOffset: currentSelection.getAnchorOffset() + text.length,
      focusOffset: currentSelection.getAnchorOffset() + text.length,
    }) as SelectionState;

    // Updating Editor State
    setEditorState(EditorState.forceSelection(newEditorState, newSelection));

    // Updating Tool bar based on the current location of the caret and respective inline styles
    dispatchToolBar({
      styles: editorState.getCurrentInlineStyle().toJS(),
      isAuto: true,
    });

    // Conveying that the input has been handled
    return "handled";
  };

  // Adding EventListener to trigger key bindings and also removing eventlistener when component gets unmounted
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAction, handleKeyDown]);

  const resetState = useCallback(
    (event: any) => {
      event.preventDefault();
      handleAction(ACTION_TYPES.CLEAR);
    },
    [handleAction]
  );

  const blockStyleFn = (block: any) => {
    console.log(block);
    return "superFancyBlock";
  };

  return (
    <div className="h-full w-full bg-slate-100 flex flex-col justify-center items-center">
      <Header />
      <div
        className="w-4/5 h-full justify-center -mt-4 flex items-center"
        onClick={resetState}>
        <ToolBar handleAction={handleAction} toolBarState={toolBarState} />
        <div className="bg-white w-full h-4/5 overflow-hidden">
          <div className="p-20 text-lg">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              handleBeforeInput={handleBeforeInput}
              blockStyleFn={blockStyleFn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
