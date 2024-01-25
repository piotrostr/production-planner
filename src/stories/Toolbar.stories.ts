import type { Meta } from "@storybook/react";
import { Toolbar } from "../components/Toolbar";

const meta = {
  title: "Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Toolbar>;

export default meta;
