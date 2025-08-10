import { cn } from "@/lib/cn";
import { type VariantProps, createCTX } from "native-variants";
import { styled, theme } from "@/lib/nva";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  type ComponentProps,
  memo,
  type PropsWithChildren,
  type RefObject,
  useCallback,
} from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./button";
import { Icon } from "./icon";

type CommonProps = {
  sheetRef?: RefObject<BottomSheetModalMethods<any> | null>;
};

const { CTXProvider, useCTX } = createCTX<
  VariantProps<typeof drawerVariants> & CommonProps
>();

const drawerVariants = styled((ctx, t) =>
  ctx({
    slots: [
      "root",
      "handler",
      "wrapper",
      "handler_indicator",
      "header",
      "content",
    ],
    base: {
      handler: {
        paddingBottom: 0,
        paddingTop: 0,
      },
      handler_indicator: {
        backgroundColor: t.colors.border,
      },
      header: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingBottom: t.spacing["2"],
        paddingHorizontal: t.spacing["3.5"],
        paddingTop: Platform.OS === "ios" ? t.spacing["2"] : t.spacing["3"],
      },
      content: {
        paddingBottom: t.spacing["6"],
        paddingHorizontal: t.spacing["6"],
        paddingTop: t.spacing["2"],
      },
    },
    variants: {
      fullScreen: {
        true: {
          root: {
            borderRadius: 0,
          },
          content: {
            height: "100%",
          },
          handler_indicator: {
            display: "none",
            padding: 0,
          },
          wrapper: {
            height: "100%",
          },
        },
        false: {
          root: {
            borderRadius: t.radii["xl"],
          },
          content: {
            height: "auto",
          },
          handler_indicator: {
            marginTop: t.radii["xl"],
            paddingBottom: 0,
          },
          wrapper: {
            height: "auto",
          },
        },
      },
    },
    defaultVariants: {
      fullScreen: "false",
    },
  })
);

function Drawer({
  children,
  fullScreen,
  sheetRef,
}: ComponentProps<typeof BottomSheetModalProvider> &
  VariantProps<typeof drawerVariants> &
  CommonProps) {
  return (
    <BottomSheetModalProvider>
      <CTXProvider props={{ fullScreen, sheetRef }}>{children}</CTXProvider>
    </BottomSheetModalProvider>
  );
}

function DrawerComponent({
  children,
  asChild = false,
  style,
  ...props
}: ComponentProps<typeof BottomSheetModal> &
  PropsWithChildren & {
    asChild?: boolean;
  }) {
  const ctx = useCTX();
  const insets = useSafeAreaInsets();
  const styles = drawerVariants({ fullScreen: ctx?.fullScreen });

  const onClose = useCallback(() => {
    ctx?.sheetRef?.current?.close();
  }, [ctx?.sheetRef]);

  return (
    <BottomSheetModal
      ref={ctx?.sheetRef}
      enableDismissOnClose
      handleStyle={styles.handler}
      backgroundStyle={styles.root}
      enableOverDrag={!ctx?.fullScreen}
      enableDynamicSizing={!ctx?.fullScreen}
      enablePanDownToClose={!ctx?.fullScreen}
      handleIndicatorStyle={styles.handler_indicator}
      enableHandlePanningGesture={!ctx?.fullScreen}
      enableContentPanningGesture={!ctx?.fullScreen}
      snapPoints={!ctx?.fullScreen ? undefined : ["100%"]}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          opacity={0.5}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      {...props}
    >
      <BottomSheetView
        style={cn(
          styles.wrapper,
          ctx?.fullScreen && {
            paddingTop: insets.top,
          },
          {
            paddingBottom:
              Platform.OS === "ios" ? theme.spacing["4"] : insets.bottom,
          }
        )}
      >
        {asChild ? (
          children
        ) : (
          <>
            {ctx?.fullScreen && (
              <View style={styles.header}>
                <Button onPress={onClose} size="icon" variant="ghost">
                  <Icon name="x" size={28} />
                </Button>
              </View>
            )}
            <View
              style={
                cn(
                  styles.content,
                  { paddingBottom: insets.bottom },
                  style
                ) as any
              }
            >
              {children}
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const DrawerContent = memo(DrawerComponent);

export { DrawerContent, Drawer };
