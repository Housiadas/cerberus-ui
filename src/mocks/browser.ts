import { setupWorker } from "msw/browser";

import { authHandlers, userHandlers } from "./handlers";

export const worker = setupWorker(...authHandlers, ...userHandlers);
