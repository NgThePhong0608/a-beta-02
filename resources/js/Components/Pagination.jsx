import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
    return (
        <nav className="text-center mt-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-gray-500 text-xs " +
                        (link.active ? "bg-blue-500 " : " ") +
                        (!link.url
                            ? "!text-gray-500 cursor-not-allowed "
                            : "hover:bg-gray-700")
                    }
                >
                    <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
                </Link>
            ))}
        </nav>
    );
};

export default Pagination;
