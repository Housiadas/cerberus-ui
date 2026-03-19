// Audits API client functions.
// Each function maps to an audit endpoint from the OpenAPI spec.

import type { AuditPageResult, ListAuditsParams } from "@/types/audits";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** GET /api/v1/audits - List audits with optional filters */
export const listAudits = async (params: ListAuditsParams, token: string): Promise<AuditPageResult> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, value);
    }
  }
  const query = searchParams.toString();
  const url = `${API_BASE}/api/v1/audits${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<AuditPageResult>(response);
};
