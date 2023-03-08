/**
 * DO NOT MODIFY THIS FILE
 * THERE ARE ONLY OLD RULES THAT SHOULD BE ACTUALIZED
 * @see https://github.com/feature-sliced/eslint-config/issues/17
 */

// Allowed paths for public API
const PUBLIC_PATHS = [
    "appLayer",
    "pages",
    "features",
    "shared",
    "shared/**",
    "models",
];
// Private imports are prohibited, use public imports instead
const PRIVATE_PATHS = [
    "appLayer/**",
    "pages/**",
    "features/**",
    "shared/*/**",
];
// Prefer absolute imports instead of relatives (for root modules)
const RELATIVE_PATHS = [
    "../**/appLayer",
    "../**/pages",
    "../**/features",
    "../**/shared",
    "../**/models",
];

module.exports = {
    parserOptions: {
        ecmaVersion: "2015",
        sourceType: "module",
    },
    plugins: [
        "import",
    ],
    rules: {
        "import/first": 2,
        "import/no-unresolved": 0, // experimental
        "import/order": [
            2,
            {
                pathGroups: PUBLIC_PATHS.map(
                    (pattern) => ({
                        pattern,
                        group: "internal",
                        position: "after",
                    }),
                ),
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        // TODO: with messages (https://github.com/feature-sliced/eslint-config/issues/3)
        "no-restricted-imports": [
            2, 
            { 
                patterns: [...PRIVATE_PATHS, ...RELATIVE_PATHS] 
            }
        ],
    },
};
