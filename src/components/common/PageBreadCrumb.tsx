import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface BreadcrumbProps {
  pageTitle: string;
  description?: string; // Optional eyebrow line shown under the title
  actions?: React.ReactNode; // Optional page-level actions shown before the trail
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, description, actions }) => {
  const t = useTranslations("common");

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <h2
          className="text-xl font-semibold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          {pageTitle}
        </h2>
        {description && (
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {actions}
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href="/"
              >
                {t("home")}
                <svg
                  className="stroke-current rtl:rotate-180"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              {pageTitle}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
