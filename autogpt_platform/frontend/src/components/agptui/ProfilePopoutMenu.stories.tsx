import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePopoutMenu } from "./ProfilePopoutMenu";
import { userEvent, within } from "@storybook/test";
import { IconType } from "../ui/icons";

const meta = {
  title: "AGPT UI/Profile/Profile Popout Menu",
  component: ProfilePopoutMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: { control: "text" },
    userEmail: { control: "text" },
    avatarSrc: { control: "text" },
    menuItemGroups: { control: "object" },
    hideNavBarUsername: { control: "boolean" },
  },
} satisfies Meta<typeof ProfilePopoutMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItemGroups = [
  {
    items: [
      { icon: IconType.Edit, text: "Edit profile", href: "/profile/edit" },
    ],
  },
  {
    items: [
      {
        icon: IconType.LayoutDashboard,
        text: "Creator Dashboard",
        href: "/dashboard",
      },
      {
        icon: IconType.UploadCloud,
        text: "Publish an agent",
        href: "/publish",
      },
    ],
  },
  {
    items: [{ icon: IconType.Settings, text: "Settings", href: "/settings" }],
  },
  {
    items: [
      {
        icon: IconType.LogOut,
        text: "Log out",
        onClick: () => console.log("Logged out"),
      },
    ],
  },
];

export const Default: Story = {
  args: {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    avatarSrc: "https://avatars.githubusercontent.com/u/123456789?v=4",
    menuItemGroups: defaultMenuItemGroups,
    hideNavBarUsername: false,
  },
};

export const NoAvatar: Story = {
  args: {
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    menuItemGroups: defaultMenuItemGroups,
    hideNavBarUsername: false,
  },
};

export const LongUserName: Story = {
  args: {
    userName: "Alexander Bartholomew Christopherson III",
    userEmail: "alexander@example.com",
    avatarSrc: "https://avatars.githubusercontent.com/u/987654321?v=4",
    menuItemGroups: defaultMenuItemGroups,
    hideNavBarUsername: false,
  },
};

export const WithInteraction: Story = {
  args: {
    ...Default.args,
    hideNavBarUsername: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const profileTrigger = canvas.getByText("John Doe");

    await userEvent.click(profileTrigger);

    // Wait for the popover to appear
    await canvas.findByText("Edit profile");
  },
};
