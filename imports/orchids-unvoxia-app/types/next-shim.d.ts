declare module 'next/link' {
  import * as React from 'react';
  export default function Link(props: React.PropsWithChildren<{ href: string; style?: React.CSSProperties; className?: string }>): React.ReactElement;
}

declare module 'next/server' {
  export const NextResponse: any;
}
