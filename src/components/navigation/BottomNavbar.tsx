"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "../../lib/utils";
import { useThemeStore } from "../../store/useThemeStore";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  action?: () => void;
  isAction?: boolean;
}

interface BottomNavbarProps {
  className?: string;
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function BottomNavbar({
  className,
  items,
  activeItem,
  onItemClick,
}: BottomNavbarProps) {
  const [active, setActive] = useState(activeItem || items[0]?.id);
  const accentColor = useThemeStore((state) => state.accentColor);
  const showNavLabels = useThemeStore((state) => state.showNavLabels);

  useEffect(() => {
    if (activeItem) {
      setActive(activeItem);
    }
  }, [activeItem]);

  const handleItemClick = (id: string, isAction?: boolean, action?: () => void) => {
    if (action) {
      action();
      return;
    }
    if (!isAction) setActive(id);
    if (onItemClick) {
      onItemClick(id);
    }
  };

  const mainItems = items.filter((item) => !item.isAction);
  const actionItems = items.filter((item) => item.isAction);

  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(
        "z-40 flex items-center justify-center pointer-events-auto",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#111522]/95 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
        {mainItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.isAction, item.action)}
              className={cn(
                "relative group flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 select-none",
                isActive
                  ? "text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]",
              )}
              style={
                isActive
                  ? {
                      backgroundColor: `${accentColor.value}26`,
                      border: `1px solid ${accentColor.value}80`,
                    }
                  : {
                      border: "1px solid transparent",
                    }
              }
              title={item.label}
            >
              <Icon
                icon={item.icon}
                className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "scale-105" : "",
                )}
                style={isActive ? { color: accentColor.value } : undefined}
              />
              {showNavLabels && (
                <span
                  className={cn(
                    "font-smallcaps tracking-wide text-xs",
                    isActive ? "font-bold text-white" : "text-white/70",
                  )}
                >
                  {item.label}
                </span>
              )}
              {isActive && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: accentColor.value }}
                />
              )}
            </button>
          );
        })}

        {actionItems.length > 0 && (
          <>
            <div className="h-6 w-[1px] bg-white/10 mx-1" />
            {actionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.isAction, item.action)}
                className="relative group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200 select-none border border-transparent hover:border-white/10"
                title={item.label}
              >
                <Icon
                  icon={item.icon}
                  className="w-5 h-5 transition-transform duration-200 group-hover:rotate-45"
                />
                {showNavLabels && (
                  <span className="font-smallcaps tracking-wide text-xs text-white/70">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
}
