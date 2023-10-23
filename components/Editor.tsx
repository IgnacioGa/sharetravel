import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

function Editor({ text, setText }: Props) {
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          // do something when editor's content changed
          const data = editor.getData();
          setText(data);
        }}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;
