export const SAMPLE_GAMES = [
    {
        id: 1,
        opponent: 'Michigan State',
        date: '2024-08-31',
        time: '3:30 PM',
        location: 'Husky Stadium',
        isHome: true,
        week: 1
    },
    {
        id: 2,
        opponent: 'Oregon',
        date: '2024-09-14',
        time: '7:00 PM',
        location: 'Husky Stadium',
        isHome: true,
        week: 3
    },
    {
        id: 3,
        opponent: 'USC',
        date: '2024-09-28',
        time: '4:00 PM',
        location: 'Los Angeles Memorial Coliseum',
        isHome: false,
        week: 5
    },
];

export const HISTORICAL_DATA = {
    'Michigan State': {
        wins: 3,
        losses: 2,
        winPercentage: 0.60,
        odds: 1.8 // Higher odds mean better payout for correct prediction
    },
    'Oregon': {
        wins: 4,
        losses: 6,
        winPercentage: 0.40,
        odds: 2.2
    },
    'USC': {
        wins: 5,
        losses: 5,
        winPercentage: 0.50,
        odds: 2.0
    }
}; 