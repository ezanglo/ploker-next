'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Text, VariantProps } from '@nextui-org/react'
import { Flex } from '../styles/Flex'
import { Box } from '../styles/Box'

interface DeckProps {
    type: string
}

interface DragProps {
    startX: number,
    startScrollLeft: number,
    isDragging: boolean
}

interface DeckTypeProps {
    id: string,
    label: string,
    cards: Array<string>
}

const cardVariants = {
    selected: {
        rotateY: 180,
        scale: 1.1,
        transition: { duration: .35 },
        zIndex: 10,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
    },
    notSelected: (i: number) => ({
        rotateY: i * 15,
        scale: 1 - Math.abs(i * 0.15),
        x: i ? i * 50 : 0,
        opacity: 1 - Math.abs(i * .15),
        zIndex: 10 - Math.abs(i),
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        transition: { duration: .35 }
    })
}

export const decks = [
    {
        id: 'fibonacci',
        label: 'Fibonacci',
        cards: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']
    },
    {
        id: 'modified',
        label: 'Modified Fibonacci',
        cards: ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?']
    }
]

// type deckVariants = VariantProps<typeof decks>;

const Deck: FC<DeckProps> = ({ type = 'modified' }) => {
    const [{
        startX,
        startScrollLeft,
        isDragging
    }, setDragStart] = useState<DragProps>({
        startX: 0,
        startScrollLeft: 0,
        isDragging: false
    })

    const [selectedCard, setSelectedCard] = useState<number>()
    const [selectedDeck, setSelectedDeck] = useState<DeckTypeProps>(decks[0])

    const containerRef = useRef<HTMLDivElement>(null!)
    const cardRefs = useRef<Array<HTMLDivElement | null>>(new Array())


    useEffect(() => {
        const { scrollWidth, clientWidth } = containerRef.current;
        const halfScroll = (scrollWidth - clientWidth) / 2;
        containerRef.current.scrollLeft = halfScroll;
        setSelectedDeck(decks.find(d => d.label === type) ?? decks[0]);
    }, [type]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragStart({
            startX: e.pageX - containerRef.current.offsetLeft,
            startScrollLeft: containerRef.current.scrollLeft,
            isDragging: true
        });
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || selectedCard) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        containerRef.current.scrollLeft = startScrollLeft - walk;
    }

    const selectCard = (index: number) => {
        setSelectedCard(selectedCard ? 0 : index);

        if (index && !selectedCard) {
            cardRefs.current[index]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    const handleCardMouseUp = (e: React.MouseEvent, index: number) => {
        if (isDragging) {
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) < 5) selectCard(index);
        } else selectCard(index);
    }

    return (
        <div
            className="grid place-items-center"
            onMouseDown={handleMouseDown}
            onMouseUp={() => setDragStart(prev => ({ ...prev, isDragging: false }))}
            onMouseMove={handleMouseMove}
        >
            <div
                className="max-w-full whitespace-nowrap overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                ref={containerRef}
            >
                {selectedDeck?.cards.map((card, i) => (
                    <motion.div
                        className="relative inline-flex items-center justify-center w-14 h-16 bg-white m-1 rounded-lg cursor-pointer 
                        border-1 border-blue-900 border-solid border-spacing-4"
                        key={i}
                        variants={cardVariants}
                        ref={el => cardRefs.current.push(el)}
                        onMouseUp={e => handleCardMouseUp(e, i)}
                        animate={selectedCard === i ? "selected" : "notSelected"}
                        custom={selectedCard ? selectedCard - i : 0}
                    >
                        <Text className="text-black">{card}</Text>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Deck