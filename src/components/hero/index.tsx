import { Button, Divider, Input, Text } from '@nextui-org/react';
import React from 'react';
import { CheckIcon } from '../icons/CheckIcon';
import { Box } from '../styles/Box';
import { Flex } from '../styles/Flex';
import CreateGameModal from '../navbar/CreateGameModal';

export const Hero = () => {
    return (
        <>
            <Flex className='gap-3 flex-col content-center justify-center items-center sm:flex-row sm:mt-20'>
                <Box className='flex flex-col gap-4 text-center sm:text-start'>
                    <Box className='max-w-xl'>
                        <Text h1 className='inline'>
                            Plan Smarter, Not Harder with{' '}
                        </Text>
                        <Text h1 className='inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'>
                            PLOKER/next
                        </Text>
                    </Box>

                    <Text span size="lg" className='text-gray-400 max-w-lg'>
                        Take your Agile and Scrum development to the next level with our Planning Poker tool
                    </Text>

                    <Flex className='gap-4 pt-2' wrap={'wrap'}>
                        <CreateGameModal />
                    </Flex>
                </Box>
                <Box className='max-w-3xl'>
                    <img src="mock.png" />
                </Box>
            </Flex>
            <Divider className='absolute inset-x-0 left-0 mt-10' />
        </>
    );
};