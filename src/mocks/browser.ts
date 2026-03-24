import { setupWorker } from "msw/browser";

import { authHandlers, permissionHandlers, roleHandlers, userHandlers } from "./handlers";

export const worker = setupWorker(...authHandlers, ...permissionHandlers, ...roleHandlers, ...userHandlers);
