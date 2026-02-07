// .storybook/preview.ts
import type { Preview } from "@storybook/react";

// 👇 ADD THIS LINE (use the path to your actual global CSS file)
import "../src/index.css"; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;