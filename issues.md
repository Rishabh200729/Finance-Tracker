# Code Review & Architecture Review

Date: 2026-02-11

## Scope

Reviewed core areas:
- Authentication and route protection
- Transaction and budget mutation flows
- Dashboard data loading/state management
- Schema and data model consistency
- Baseline code quality (lint)

## What looks good

1. **Server Actions for data mutations** keep sensitive writes out of the client layer.
2. **Relational schema with foreign keys and cascades** is in place for user-owned data.
3. **Use of DB transactions** in add/delete transaction flows is a strong consistency pattern.
4. **App Router layout** centralizes session check + shared provider wiring.

## High-priority findings

### 1) Authorization gap in delete flow
`deleteTransaction` accepts a `transactionId`, fetches by id, and deletes it without verifying that the transaction belongs to the currently authenticated user. This enables insecure direct object reference (IDOR) if an attacker can submit another id.

**Recommendation**: Read session in the action and constrain select/delete/update by both `transactions.id` and `transactions.userId`.

### 2) Type/model mismatch for money values
Schema defines `transactions.amount` and budget amounts as `integer`, but transaction create flow parses user input using `parseFloat`. If decimal values are entered, coercion/truncation issues can occur depending on DB behavior and expected currency precision.

**Recommendation**: Represent money as integer minor units (e.g., paise/cents) consistently, or migrate to numeric/decimal with explicit precision and validation.

### 3) Route protection checks token presence only
`proxy.ts` guards dashboard routes by checking if a cookie exists; it does not validate JWT signature/expiry. Expired or forged values still pass middleware-level checks.

**Recommendation**: Verify JWT in middleware/proxy with the signing secret and fail closed on verification errors.

### 4) Dashboard loading state can deadlock
`components/Dashboard.tsx` initializes `loading` from `totalExpenses` and never sets it to false later. When expenses are zero, dashboard can remain stuck in loading.

**Recommendation**: Remove local loading state or derive loading from actual async state from the server/provider.

## Medium-priority findings

### 5) Query relation naming inconsistency risk
`getDashBoardData` requests `monthly_incomes` relation while schema relation key is declared as `monthlyIncomes`. This is likely to break type safety/runtime query composition.

**Recommendation**: Use relation keys exactly as defined in Drizzle relations.

### 6) Context uses `any` pervasively
`FinanceContext` exposes many `any` fields, reducing compile-time safety for critical finance data and increasing runtime defect risk.

**Recommendation**: Define shared domain types (Transaction, Budget, SavingsGoal, DashboardData) and use them in context/actions/components.

### 7) Search input is not wired
Transactions page renders search UI but does not update `searchTerm` (`onChange` missing), so filtering currently has no effect.

**Recommendation**: Bind input value and onChange; consider debounce if dataset grows.

## Quality baseline

Running `npm run lint` currently reports **13 errors and 37 warnings**, including:
- `no-explicit-any` in context/components
- `react/no-unescaped-entities` in UI content
- Unused imports/variables

## Suggested remediation order

1. Fix authorization in mutation actions (security first).
2. Align money type strategy across schema + actions + UI.
3. Strengthen middleware token verification.
4. Remove dashboard loading deadlock and wire transaction search.
5. Replace `any` types with shared DTO/domain interfaces.
6. Resolve lint errors, then warnings.
