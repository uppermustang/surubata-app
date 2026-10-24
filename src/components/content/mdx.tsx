import type { ComponentProps } from "react";
import { childrenToText, slugify } from "@/lib/utils";

function Heading({ as: Tag, children, ...props }: { as: "h2" | "h3" } & ComponentProps<"h2">) {
  const id = slugify(childrenToText(children));
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: ComponentProps<"h3">) => <Heading as="h3" {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) => (
    <a href={href} {...props} rel={href.startsWith("http") ? "noopener noreferrer" : props.rel} target={href.startsWith("http") ? "_blank" : props.target} />
  ),
};
