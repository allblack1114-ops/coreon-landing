# COREON Safety AX desktop release closure

This file documents the final CI packaging correction for unsigned verification builds. The macOS workflow must remove empty signing/notarization environment variables before running `electron-builder` when production release approval is not enabled. Production publishing remains fail-closed and still requires Windows signing plus Apple Developer ID signing/notarization credentials.
