// ─── Static Promotions Data ───────────────────────────────────────────────────
// Fallback / seed data for promotions used before the JSON server was introduced.
// featured: true marks the promotion shown in the HomeScreen featured card.
export const PROMOTIONS = [
    {
        id: 0,
        name: 'Mountain Adventure',
        image: require("../assets/images/breadcrumb-trail.jpg"),
        featured: true, // This promotion appears in the HomeScreen featured card
        description:
            'Book a 5-day mountain trek with a seasoned outdoor guide! Fly fishing equipment and lessons provided.',
    },
];
