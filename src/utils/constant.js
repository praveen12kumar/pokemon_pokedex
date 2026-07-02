export const navigationRoutes = [
    {
        name:'Search',
        path:'/search',
    },
    {
        name:'Pokemon',
        path:'/',
    },
    {
        name:'Compare',
        path:'/compare',
    },
    {
        name:'My Team',
        path:'/team',
    },
];

export const pokemonTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
    "steel", "fairy"
];

export const sortOptions = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },
    { label: "HP", value: "hp" },
    { label: "Attack", value: "attack" },
    { label: "Defense", value: "defense" },
    { label: "Speed", value: "speed" },
];

export const footerNav = [
    {    
        name:'description',
        path:'description'
    },
    {
        name:"evolution",
        path:"evolution"
    },
    {
        name:"location",
        path:"locations"
    },
    {
        name:"moves",
        path:"moves"
    }
]