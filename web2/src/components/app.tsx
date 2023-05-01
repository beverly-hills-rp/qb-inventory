import { useState } from 'preact/hooks';

const App = () => {
    const [cards, setCards] = useState([
        { id: '1', title: 'Card 1' },
        { id: '2', title: 'Card 2' },
        { id: '3', title: 'Card 3' },
    ]);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards((prevState) => {
            const newState = [...prevState];
            newState.splice(dragIndex, 1);
            newState.splice(hoverIndex, 0, dragCard);
            return newState;
        });
    };

    return (
        <div className="app">
            {cards.map((card, index) => (
                <div
                    key={card.id}
                    className="card"
                    data-testid={`card-${card.id}`}
                >
                    {card.title}
                </div>
            ))}
        </div>
    );
};

export default App;
