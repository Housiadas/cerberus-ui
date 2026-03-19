// React Query hooks for audit endpoints.
// Usage: import { useListAudits } from '@/hooks/use-audits'

import { useQuery } from "@tanstack/react-query";

import { listAudits } from "@/lib/api/audits";
import type { AuditPageResult, ListAuditsParams } from "@/types/audits";
import type { ApiError } from "@/types/auth";

/** Audits query key factory */
export const auditsKeys = {
  all: ["audits"] as const,
  lists: () => [...auditsKeys.all, "list"] as const,
  list: (params: ListAuditsParams) => [...auditsKeys.lists(), params] as const,
};

/** Hook for listing audit logs with optional filters. Requires access token. */
export const useListAudits = (params: ListAuditsParams, token: string) => {
  return useQuery<AuditPageResult, ApiError>({
    queryKey: auditsKeys.list(params),
    queryFn: () => listAudits(params, token),
    enabled: !!token,
  });
};
