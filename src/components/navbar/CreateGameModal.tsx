'use client';

import { Button, Dropdown, Input, Modal, Text } from '@nextui-org/react';
import { FC, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Deck from '../game/Deck';

interface CreateGameProps {

}

const CreateGameModal: FC<CreateGameProps> = ({ }) => {
    const [gameName, setGameName] = useState<string>()
    const [visible, setVisible] = useState<boolean>(false)
    const [deck, setDeck] = useState<string>('Modified Fibonacci')

    return (
        <div>
            <Button auto flat onPress={() => setVisible(true)}>
                Start a game
            </Button>
            <Modal
                closeButton
                blur
                aria-labelledby={"modal-title"}
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Start a{' '}
                        <Text b className='inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600'>
                            Ploker/next
                        </Text>
                        {' '}Game
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Your name"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Game Title"
                    />
                    <Dropdown>
                        <Dropdown.Button flat>{deck}</Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={[deck]}
                            onSelectionChange={(selection) => {
                                const selectedValue = Array.from(selection).join(", ").replaceAll("_", " ")
                                setDeck(selectedValue);
                            }}
                        >
                            <Dropdown.Item key="Fibonacci">Fibonacci</Dropdown.Item>
                            <Dropdown.Item key="Modified Fibonacci">Modified Fibonacci</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Deck type={deck} />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto className='w-full'>
                        Start Game
                    </Button>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Game Title"
                    />
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateGameModal