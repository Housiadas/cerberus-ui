// React Query hooks for system health check endpoints.
// Usage: import { useReadiness, useLiveness } from '@/hooks/use-system'

import { useQuery } from "@tanstack/react-query";

import { liveness, readiness } from "@/lib/api/system";
import type { ApiError } from "@/types/auth";
import type { Info, Status } from "@/types/system";

/** System query key factory */
export const systemKeys = {
  all: ["system"] as const,
  readiness: () => [...systemKeys.all, "readiness"] as const,
  liveness: () => [...systemKeys.all, "liveness"] as const,
};

/** Hook for checking service readiness (database connectivity) */
export const useReadiness = () => {
  return useQuery<Status, ApiError>({
    queryKey: systemKeys.readiness(),
    queryFn: readiness,
  });
};

/** Hook for checking service liveness (status info) */
export const useLiveness = () => {
  return useQuery<Info, ApiError>({
    queryKey: systemKeys.liveness(),
    queryFn: liveness,
  });
};
