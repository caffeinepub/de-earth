# de earth

## Current State
Admin access requires using a deployment token via `_initializeAccessControlWithSecret`. The user cannot complete this flow. The `needsAdmin` function traps if the caller is not in the roles map or not admin. The `isCallerAdmin` query also traps for unregistered users.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `needsAdmin` in main.mo: accept any non-anonymous caller as admin
- `isCallerAdmin` in MixinAuthorization.mo: return true for any non-anonymous caller
- Admin.tsx: remove token entry form, grant access to any logged-in user

### Remove
- Token-based admin gate in the frontend

## Implementation Plan
1. Update `needsAdmin` in main.mo to check `not caller.isAnonymous()`
2. Update `isCallerAdmin` in MixinAuthorization.mo to return `not caller.isAnonymous()`
3. Update Admin.tsx to remove token section and show admin panel directly after login
