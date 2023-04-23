import { Box } from "../styles/Box";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <Box className="max-w-full"
        css={{
            background: '$background',
        }}
    >
        {children}
    </Box>
);