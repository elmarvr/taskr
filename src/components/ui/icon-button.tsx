import { cloneElement, forwardRef, useContext } from "react";
import {
  SizeTokens,
  Stack,
  ThemeableStack,
  View,
  createStyledContext,
  styled,
  useGetThemedIcon,
  useTheme,
  withStaticProperties,
} from "tamagui";
import { getSize, getSpace } from "@tamagui/get-token";
import config from "tamagui.config";

type SizeToken = keyof typeof config.tokens.size;

export const IconButtonContext = createStyledContext({
  size: "$4" as SizeTokens,
});

const IconButtonFrame = styled(ThemeableStack, {
  theme: "Button",
  name: "IconButton",
  context: IconButtonContext,
  tag: "button",
  focusable: true,
  role: "button",
  backgrounded: true,
  alignItems: "center",
  justifyContent: "center",
  pressTheme: true,

  variants: {
    size: {
      "...size": (size, { tokens }) => {
        return {
          width: size,
          height: size,
          borderRadius: tokens.size[size as SizeToken].val * 0.2,
        };
      },
    },
  } as const,
});

const ButtonIcon = ({ children }: { children: React.ReactElement }) => {
  const context = useContext(IconButtonContext);
  const theme = useTheme();

  const smaller = getSize(context.size, {
    shift: -1,
  });

  const icon = cloneElement(children, {
    size: smaller.val * 0.5,
    color: theme.color.get(),
  });

  return icon;
};

export const IconButton = forwardRef<
  React.ComponentRef<typeof IconButtonFrame>,
  React.ComponentPropsWithoutRef<typeof IconButtonFrame>
>(({ children, ...props }, ref) => {
  return (
    <IconButtonFrame ref={ref} {...props}>
      <ButtonIcon>{children}</ButtonIcon>
    </IconButtonFrame>
  );
});
