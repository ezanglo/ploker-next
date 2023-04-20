import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Card, Container, Navbar, Row, Switch, Text } from '@nextui-org/react'
import { Layout } from '@/components/navbar/layout'
import { Nav } from '@/components/navbar/navbar'
import { Box } from '@/components/styles/Box'
import { Hero } from '@/components/hero'
import { PlokerNextLogo } from '@/components/icons/PlokerNextLogo'
import { useTheme as useNextTheme } from 'next-themes';
import { useTheme } from '@nextui-org/react';
import { SunIcon } from '@/components/icons/SunIcon'
import { MoonIcon } from '@/components/icons/MoonIcon'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  return (
    <Layout>
      <Navbar variant="sticky">
        <Navbar.Brand>
          {/* <Navbar.Toggle aria-label="toggle navigation" /> */}
          <PlokerNextLogo />
          <Text b color="inherit" hideIn="xs">
            {'PLOKER/next'}
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Button light auto>
            Signup
          </Button>
          <Button light auto>
            Login
          </Button>
          <Button flat>
            Start a game
          </Button>
          <Button
            ripple={false}
            light auto
            onClick={() =>
              setTheme(isDark ? 'light' : 'dark')
            }
            icon={isDark ? <SunIcon /> : <MoonIcon />}
          />
        </Navbar.Content>
      </Navbar>
      <Box as="main">
        <Hero />
      </Box>
    </Layout>
  )
}
