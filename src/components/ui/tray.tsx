import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Animated, Keyboard, KeyboardAvoidingView, KeyboardEvent, LayoutChangeEvent, View } from "react-native";
import {
  Portal,
  ThemeableStack,
  createContext,
  styled,
  useConfiguration,
  useControllableState,
  withStaticProperties,
  AnimatePresence,
  composeEventHandlers,
  Theme,
  useThemeName,
} from "tamagui";

function useTrayProviderProps(props: TrayProps) {
  const [open, setOpen] = useControllableState({
    prop: props.open,
    defaultProp: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
    strategy: "prop-wins",
    transition: true,
  });

  return {
    open,
    setOpen,
  };
}

const [TrayProvider, useTrayContext] = createContext<ReturnType<typeof useTrayProviderProps>>("Tray");

interface TrayProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TrayRoot = (props: TrayProps) => {
  const providerProps = useTrayProviderProps(props);
  const themeName = useThemeName();

  return (
    <Portal>
      <Theme name={themeName}>
        <TrayProvider {...providerProps}>{props.children}</TrayProvider>
      </Theme>
    </Portal>
  );
};

const TrayContentFrame = styled(KeyboardAvoidingView, {
  backgroundColor: "$background",
  p: "$3",
  h: "100%",
  borderTopRightRadius: "$4",
  borderTopLeftRadius: "$4",
});

const TrayContent = TrayContentFrame.styleable((props, ref) => {
  const { open, setOpen } = useTrayContext("Content");
  const [maxContentHeight, setMaxContentSize] = useState(-1);
  const [render, setRender] = useState(false);

  const { animationDriver } = useConfiguration();
  const { useAnimatedNumber, useAnimatedNumberStyle, useAnimatedNumberReaction } = animationDriver;
  const AnimatedView = animationDriver.View as typeof Animated.View;

  const viewRef = useRef<View | null>(null);

  const height = useAnimatedNumber(0);

  const measured = maxContentHeight !== -1;

  const animatedStyle = useAnimatedNumberStyle(height, (height) => {
    "worklet";

    if (!measured) {
      return {
        height: undefined,
      };
    }

    return {
      height,
    };
  });

  useAnimatedNumberReaction(
    {
      value: height,
      hostRef: viewRef,
    },
    (height) => {
      if (height === 0 && !open) {
        setRender(false);
      }
    }
  );

  useEffect(() => {
    const animationConfig = {
      type: "timing",
      duration: 500,
    } as const;

    if (open) {
      setRender(true);
      height.setValue(maxContentHeight, animationConfig);

      return;
    }

    // Keyboard.dismiss();
    height.setValue(0, animationConfig);
  }, [open]);

  useEffect(() => {
    function animateTo(event: KeyboardEvent, to: "top" | "bottom") {
      height.setValue((to === "top" ? event.endCoordinates.height : 0) + maxContentHeight, {
        type: "timing",
        duration: event.duration,
      });
    }

    const keyboardShowListener = Keyboard.addListener("keyboardWillShow", (event) => {
      animateTo(event, "top");
    });

    const keyboardHideListener = Keyboard.addListener("keyboardWillHide", (event) => {
      animateTo(event, "bottom");
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [maxContentHeight]);

  function measure(event: LayoutChangeEvent) {
    if (!measured) {
      setMaxContentSize(event.nativeEvent.layout.height);
    }
  }

  return (
    <AnimatedView
      ref={viewRef}
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          pointerEvents: "box-none",
          opacity: measured ? 1 : 0,
        },
        animatedStyle,
      ]}
      onLayout={measure}
    >
      {(!measured || render) && <TrayContentFrame onPress={() => setOpen(false)} {...props} ref={ref} />}
    </AnimatedView>
  );
});

const TrayOverlayFrame = styled(ThemeableStack, {
  theme: "SheetOverlay",
  backgrounded: true,
  fullscreen: true,
  zIndex: 100 - 1,

  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
      },

      false: {
        opacity: 0,
        pointerEvents: "none",
      },
    },
  },
});

const TrayOverlay = TrayOverlayFrame.styleable((props, ref) => {
  const { open, setOpen } = useTrayContext("Overlay");

  return (
    <AnimatePresence enterExitVariant="open">
      {open && (
        <TrayOverlayFrame
          {...props}
          ref={ref}
          onPress={composeEventHandlers(props.onPress, () => {
            setOpen(false);
          })}
        />
      )}
    </AnimatePresence>
  );
});

export const Tray = withStaticProperties(TrayRoot, {
  Content: TrayContent,
  Overlay: TrayOverlay,
});
