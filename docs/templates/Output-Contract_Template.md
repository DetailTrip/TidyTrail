# OUTPUT CONTRACT – TidyTrails Code Requests

> **Purpose** – Copy‑paste this section into any ChatGPT / GitHub Copilot prompt so the returned code always drops straight into the repo and passes CI on the first try.

---

## 1 · File & Folder Rules
| Rule | Requirement |
|------|-------------|
| **File path** | Must match the path you specify when you invoke the template, e.g. `src/features/booking/components/ServiceSelection.tsx`. |
| **Folder exists** | If the folder doesn’t exist, generate the parent directories as part of the answer (e.g. `mkdir -p …`). |
| **Extension** | `.tsx` for React components / hooks, `.ts` for utilities / types, `.test.tsx` for tests. |

---

## 2 · Imports & Aliases
* Use the path aliases declared in `vite.config.ts` — `@`, `@components`, `@features`, `@booking`, `@utils`.
* Do **not** use relative `../../../` paths except for sibling test files.

---

## 3 · Language, Style, & Formatting
* **React 18** + **TypeScript** (strict mode).
* Tailwind CSS utility classes for styling. No inline `style` props.
* ≤ **150 logical LOC** per component (excluding imports, blank lines, comments ≤ 10 lines).
* Use named exports plus a single default export.
* Include JSDoc or TypeDoc comments for every public interface or prop type.

---

## 4 · Quality Gates
| Gate | Command |
|------|---------|
| **Lint** | `npm run lint` (ESLint strict, Prettier) |
| **Unit tests** | `npm run test` (Vitest) |
| **Type check** | `npm run typecheck` (`tsc --noEmit`) |

Returned code **must compile & pass** all three gates.

---

## 5 · Testing Expectations
* Provide a matching `*.test.tsx` (or `*.test.ts`) when logic exists.
* Use React Testing Library + Vitest.
* Cover:  
  1. Renders without crashing.  
  2. Core interactive behaviour (clicks, form state).  
  3. Displays derived totals if pricing logic involved.
* Use `data-testid` sparingly (only when query by role/label fails).

---

## 6 · Exclusions
* **No** lawn‑mowing or raking references.
* **No** unused imports or dead code.
* **No** inline CSS except Tailwind utility overrides (`style={{ display:'none' }}` not allowed).
* **No** external component libraries unless explicitly requested.

---

## 7 · Submission Format
Deliver a single Markdown reply containing:
1. Filename in a fenced block:  
   ```text
   // File: src/features/booking/components/ServiceSelection.tsx
   ```
2. Code in a TypeScript fenced block.
3. Immediately after, include the matching test file (if required).
4. **Do not** wrap the entire answer in triple-backtick markdown — each file gets its own fence.

---

_Reviewers apply this contract during pull‑request review. Submissions that fail any gate will be requested to revise before merge._

