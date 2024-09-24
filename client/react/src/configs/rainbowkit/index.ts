import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const tailwindTheme = resolveConfig(tailwindConfig).theme;

export const lightCustomRainbowTheme: any = {
  blurs: {
    modalOverlay: "...",
  },
  fonts: {
    body: tailwindTheme.fontFamily.second.toString(),
  },
  colors: {
    actionButtonBorder: "transparent",
    accentColor: tailwindTheme.colors["realblack"],
    accentColorForeground: tailwindTheme.colors["realwhite"],
    error: tailwindTheme.colors.error[1],
    connectButtonInnerBackground: "rgba(255, 255, 255, 0.1)",
    connectButtonBackground: tailwindTheme.colors.neutral[2],
    connectButtonBackgroundError: tailwindTheme.colors["realwhite"],
    connectButtonTextError: tailwindTheme.colors.error[1],
    modalTextDim: tailwindTheme.colors.neutral[5],
    modalTextSecondary: tailwindTheme.colors.neutral[5],
    closeButtonBackground: tailwindTheme.colors.neutral[4],
    closeButton: tailwindTheme.colors.neutral[3],
    actionButtonSecondaryBackground: tailwindTheme.colors.primary[1],
    modalBorder: tailwindTheme.colors.neutral[4],
    generalBorder: tailwindTheme.colors.neutral[4],
    generalBorderDim: tailwindTheme.colors.neutral[2],
    menuItemBackground: tailwindTheme.colors.neutral[2],
    modalBackground: tailwindTheme.colors["realwhite"],
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    connectionIndicator: tailwindTheme.colors.success[1],
    standby: tailwindTheme.colors.primary[1],
    actionButtonBorderMobile: "...",
    connectButtonText: "...",
    modalText: "...",
    profileAction: "...",
    profileActionHover: "...",
    profileForeground: "...",
    selectedOptionBorder: "...",
  },
  radii: {
    actionButton: "12px",
    connectButton: "12px",
    menuButton: "12px",
    modal: "12px",
    modalMobile: "12px",
  },
  shadows: {
    connectButton: "...",
    dialog: "...",
    profileDetailsAction: "...",
    selectedOption: "...",
    selectedWallet: "...",
    walletLogo: "...",
  },
};

export const customRainbowTheme: any = {
  blurs: {
    modalOverlay: "...",
  },
  fonts: {
    body: tailwindTheme.fontFamily.second.toString(),
  },
  colors: {
    accentColor: tailwindTheme.colors.neutral[22],
    accentColorForeground: tailwindTheme.colors.neutral[27],
    error: tailwindTheme.colors.error[1],
    connectButtonInnerBackground: "rgba(255, 255, 255, 0.1)",
    connectButtonBackground: tailwindTheme.colors.neutral[2],
    connectButtonBackgroundError: tailwindTheme.colors["realwhite"],
    connectButtonTextError: tailwindTheme.colors.error[1],
    modalTextDim: tailwindTheme.colors.neutral[22],
    modalTextSecondary: tailwindTheme.colors.neutral[23],
    closeButtonBackground: tailwindTheme.colors.neutral[22],
    closeButton: tailwindTheme.colors.neutral[27],
    actionButtonSecondaryBackground: tailwindTheme.colors.neutral[27],
    actionButtonBorder: tailwindTheme.colors.neutral[22],
    modalBorder: tailwindTheme.colors.neutral[27],
    generalBorder: tailwindTheme.colors.neutral[4],
    generalBorderDim: tailwindTheme.colors.neutral[2],
    menuItemBackground: tailwindTheme.colors.neutral[25],
    modalBackground: tailwindTheme.colors.neutral[27],
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    connectionIndicator: tailwindTheme.colors.success[1],
    standby: tailwindTheme.colors.primary[1],
    actionButtonBorderMobile: "...",
    connectButtonText: "...",
    modalText: tailwindTheme.colors["realwhite"],
    profileAction: "...",
    profileActionHover: "...",
    profileForeground: "...",
    selectedOptionBorder: "...",
  },
  radii: {
    actionButton: "12px",
    connectButton: "12px",
    menuButton: "12px",
    modal: "12px",
    modalMobile: "12px",
  },
  shadows: {
    connectButton: "...",
    dialog: "...",
    profileDetailsAction: "...",
    selectedOption: "...",
    selectedWallet: "...",
    walletLogo: "...",
  },
};
