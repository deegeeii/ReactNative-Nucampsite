// ─── Static Partners Data ─────────────────────────────────────────────────────
// Fallback / seed data for community partners used before the JSON server was introduced.
// Each object has an id, name, image, featured flag, and description.
// featured: true marks the partner shown in the HomeScreen featured card.
export const PARTNERS = [
    {
        id: 0,
        name: 'Bootstrap Outfitters',
        image: require("../assets/images/bootstrap-logo.png"),
        featured: false,
        description:
            "Bootstrap Outfitters supplies you with the gear you need at prices you can't beat.",
    },
    {
        id: 1,
        name: 'Git Out Expeditions',
        image: require("../assets/images/git-logo.png"),
        featured: false,
        description:
            'Join Git Out Expeditions to explore new horizons with a group of other adventurers!',
    },
    {
        id: 2,
        name: 'Mongo Fly Shop',
        image: require("../assets/images/mongo-logo.png"),
        featured: false,
        description:
            'Need a new fishing pole, a tacklebox, or flies of all kinds? Stop by Mongo Fly Shop.',
    },
    {
        id: 3,
        name: 'Node Outdoor Apparel',
        image: require("../assets/images/node-logo.png"),
        featured: true, // This partner appears in the HomeScreen featured card
        description:
            'From polar fleeces to swimsuits, hiking boots to waders, a visit to Node will be sure to get you covered.',
    },
];
