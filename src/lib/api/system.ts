// System API client functions.
// Each function maps to a system endpoint from the OpenAPI spec.

import type { Info, Status } from "@/types/system";

import { API_BASE, handleResponse } from "./client";

/** GET /readiness - Check if the database is ready */
export const readiness = async (): Promise<Status> => {
  const response = await fetch(`${API_BASE}/readiness`, {
    method: "GET",
  });
  return handleResponse<Status>(response);
};

/** GET /liveness - Returns service status info */
export const liveness = async (): Promise<Info> => {
  const response = await fetch(`${API_BASE}/liveness`, {
    method: "GET",
  });
  return handleResponse<Info>(response);
};
