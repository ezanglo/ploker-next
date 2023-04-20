import { Box } from "../styles/Box";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <Box
        css={{
            maxW: '100%',
            background: '$background',
        }}
    >
        {children}
    </Box>
);