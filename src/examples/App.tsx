import React from "react";
import { Button } from "../lib";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Button
        bg={{ color: "maroon", lightness: 3 }}
        color="red"
        bgHover="maroon"
        colorHover="blue"
      />
    </React.Fragment>
  );
};

export default App;
