import { Fragment } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
    return (
        <nav className="text-sm mb-4">
            {breadcrumbs.length > 0 &&
                breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <Fragment key={index}>
                            {isLast ? (
                                <span className="font-semibold">{item.title}</span>
                            ) : (
                                <>
                                    <Link to={item.href} className="text-blue-500 hover:underline">
                                        {item.title}
                                    </Link>
                                    <span className="mx-2">/</span>
                                </>
                            )}
                        </Fragment>
                    );
                })}
        </nav>
    );
}
