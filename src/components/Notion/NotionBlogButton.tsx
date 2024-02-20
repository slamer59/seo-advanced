import { LinkProps } from "next/link";

/**
 * Link button props interface
 */
export interface NotionBlogButtonProps extends LinkProps {
  type: string // "primary" | "secondary" | "white";
  text: string;
  href: string;
  // className?: string;
  // textSize?: string;
}

/**
 * Link Button component
 *
 * @param {NotionBlogButtonProps} param0
 * @returns {JSX.element}
 */

export function NotionBlogButton({
  type,
  text,
  href
}: NotionBlogButtonProps) {
  /**
   * Return JSX content
   */
  return (

    <div className="flex justify-center bg-white">
      <a href={href} target="_parent"
        className={`align-middle  justify-center inline-block py-2 mt-3 md:mt-0 mt text-center cursor-pointer px-6 font-IBM font-medium rounded-full  border-2 text-2xl ${
          // eslint-disable-next-line no-nested-ternary
          type === "primary"
            ? "bg-primary border-primary text-white hover:text-primary hover:bg-white"
            : type === "secondary"
              ? "bg-secondary text-primary border-secondary hover:text-white hover:bg-primary"
              : "bg-white text-primary border-primary hover:text-primary hover:bg-white"
          } `}
      >
        {text}
      </a>
    </div>

  );
}

export default NotionBlogButton;