import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const withSafeArea =
    (WrappedComponent: React.ComponentType) => (props: any) => {
        const insets = useSafeAreaInsets();
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    backgroundColor: "white",
                }}
            >
                <WrappedComponent {...props} />
            </View>
        );
    };

export default withSafeArea;
