// src/lib/types/vitoPacks.ts

// Types matching backend Rust structures for Vito Packs

// Corresponds to Rust struct CompatibilityTarget
export interface CompatibilityTarget {
    identifier: string;
    filename: string | null;
}

// Corresponds to Rust enum VitoModSourceDefinition
export type VitoModSourceDefinition =
    | { type: 'modrinth'; project_id: string; project_slug: string } // Renamed fields to snake_case
    | { type: 'maven'; repository_ref: string; group_id: string; artifact_id: string } // Renamed fields to snake_case
    | { type: 'url' };

// Corresponds to Rust struct VitoModEntryDefinition (previously VitoPackMod)
export interface VitoModEntryDefinition { // Renamed from VitoPackMod
    id: string;
    displayName?: string | null; // Made optional
    source: VitoModSourceDefinition; // Updated type
    // compatibility field structure: Record<GameVersion, Record<Loader, CompatibilityTarget>>
    compatibility?: Record<string,
        Record<string, CompatibilityTarget> // Updated inner type
    >;
}

export interface PackListing {
    category?: string;
    weight?: number;
    hidden?: boolean;
}

// Corresponds to Rust struct VitoPackDefinition
export interface VitoPackDefinition {
    displayName: string; // Correct
    description: string; // Correct
    inheritsFrom?: string[] | null; // Added field
    excludeMods?: string[] | null; // Added field
    mods?: VitoModEntryDefinition[]; // Updated type used
    assets?: string[]; // Added field
    isExperimental?: boolean; // Added field
    listing?: PackListing;
}

// Corresponds to Rust struct VitoModpacksConfig
export interface VitoModpacksConfig {
    packs: Record<string, VitoPackDefinition>; // Maps pack ID (string) to definition
    repositories: Record<string, string>; // Maps repository reference (string) to URL (string)
} 