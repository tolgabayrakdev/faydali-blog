import type { MDXComponents } from "mdx/types";
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="my-4">{children}</p>,
    a: ({ href, children }) => 
      <Link href={href as string} className="text-blue-600 hover:underline">
        {children}
      </Link>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-200 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <div className="my-6">
        <Image
          src={src as string}
          alt={alt as string}
          width={700}
          height={400}
          className="rounded-lg"
        />
      </div>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded-md text-gray-600">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm">
        {children}
      </pre>
    ),
    ...components,
  };
}
