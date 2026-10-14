import type { TenantId } from "../data";
import { tenantDotClass, tenantName } from "../utils";

interface TenantTagProps {
  tn: TenantId;
  label?: string;
}

/** Coloured dot + tenant name, used wherever a row belongs to a client. */
export default function TenantTag({ tn, label }: TenantTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-theme-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
      <span className={`h-2 w-2 shrink-0 rounded-full ${tenantDotClass[tn]}`} />
      {label ?? tenantName(tn)}
    </span>
  );
}
