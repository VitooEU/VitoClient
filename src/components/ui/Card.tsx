"use client";

import type React from "react";
import { forwardRef, type ReactNode, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../store/useThemeStore";
import { 
  getVariantColors,
  getBorderRadiusClass,
  createRadiusStyle,
  getAccessibilityProps,
  type ComponentVariant
} from "./design-system";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: ComponentVariant;
  withAnimation?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  role?: string;
  ariaLabel?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    className,
    variant = "default",
    withAnimation = true,
    onClick,
    onContextMenu,
    role,
    ariaLabel,
  },
  ref,
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accentColor = useThemeStore((state) => state.accentColor);
  const borderRadius = useThemeStore((state) => state.borderRadius);
  const isBackgroundAnimationEnabled = useThemeStore(
    (state) => state.isBackgroundAnimationEnabled,
  );
  const [isHovered, setIsHovered] = useState(false);

  const mergedRef = (node: HTMLDivElement) => {
    if (ref) {
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    cardRef.current = node;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const colors = getVariantColors(variant, accentColor);
  const accessibilityProps = getAccessibilityProps({
    label: ariaLabel,
    disabled: false
  });

  const getBoxShadow = () => {
    switch (variant) {
      case "3d":
        return `0 8px 0 rgba(0,0,0,0.3), 0 10px 15px rgba(0,0,0,0.35), inset 0 1px 0 ${colors.light}40, inset 0 0 0 1px ${colors.main}20`;
      case "elevated":
        return `0 10px 0 rgba(0,0,0,0.3), 0 15px 25px rgba(0,0,0,0.5), inset 0 1px 0 ${colors.light}40, inset 0 0 0 1px ${colors.main}20`;
      case "secondary":
        return `0 6px 0 rgba(0,0,0,0.25), 0 8px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)`;
      default:
        return isHovered
          ? "0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.08) inset"
          : "0 4px 16px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.04) inset";
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case "3d":
      case "elevated":
      case "secondary":
        return "border-2 border-b-4";
      case "flat-secondary":
      case "flat":
        return "border border-b-2";
      default:
        return "border";
    }
  };

  const getBackgroundColor = () => {
    if (variant === "secondary") {
      return "rgba(255, 255, 255, 0.05)";
    }

    if (variant === "flat-secondary") {
      return "rgba(255, 255, 255, 0.07)";
    }

    return "rgba(20, 22, 28, 0.65)";
  };

  const getBorderColor = () => {
    if (variant === "secondary" || variant === "flat-secondary") {
      return isHovered ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.10)";
    }

    return isHovered ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.08)";
  };

  const getBorderBottomColor = () => {
    if (variant === "secondary" || variant === "flat-secondary") {
      return isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.10)";
    }

    if (variant === "3d") {
      return isHovered ? colors.light : colors.main;
    }

    return isHovered ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.08)";
  };  return (
    <div
      ref={mergedRef}
      role={role || (onClick ? "button" : undefined)}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "relative backdrop-blur-md overflow-hidden",
        getBorderRadiusClass(borderRadius),
        getBorderStyle(),
        onClick && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderBottomColor: getBorderBottomColor(),
        boxShadow: getBoxShadow(),
        filter: isHovered ? "brightness(1.1)" : "brightness(1)",
        ...createRadiusStyle(borderRadius, 1.2),
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={onContextMenu}
      {...accessibilityProps}
    >
      {variant === "3d" && (
        <span
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            backgroundColor:
              variant === "3d"
                ? "rgba(156, 163, 175, 0.8)"
                : variant === "flat-secondary"
                  ? "rgba(156, 163, 175, 0.8)"
                  : `${colors.main}80`,
            borderTopLeftRadius: borderRadius === 0 ? "0" : `${Math.round(borderRadius * 1.2)}px`,
            borderTopRightRadius: borderRadius === 0 ? "0" : `${Math.round(borderRadius * 1.2)}px`,
          }}
        />
      )}
      {children}
    </div>
  );
});

Card.displayName = "Card";
