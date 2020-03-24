import React from "react";
import { storiesOf } from "@storybook/react";
import SurrenderModal from "./SurrenderModal";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "--2",
  component: SurrenderModal,
  decorators: [withKnobs]
};

export const standard = () => {
  const isOpen = boolean("open", true);
  const comment = text("Commentary", "what is going on here?");
  const title = text("title", "Storybook");

  return (
    <SurrenderModal
      modalHook={{
        closeModal: () => {},
        info: {
          title: <span>{title}</span>,
          Commentary: <span>{comment}</span>
        },
        open: isOpen,
        openModal: () => {},
        setOpen: () => {}
      }}
      handleClickNextBtn={() => {}}
    />
  );
};

standard.story = {
  name: "Default"
};
