export const navigationRoutes = [
    {
        name:'Search',
        path:'/search',
    },
    {
        name:'Compare',
        path:'/compare',
    },
    {
        name:'Pokemon',
        path:'/pokemon',
    },
    {
        name:'About',
        path:'/about',
    }
];

export const footerNav = [
    {   
        name:'Description',
        path:'/pokemon/:name'
    },
    {
        name:"Evolution",
        path:"/pokemon/:name/evolution"
    },
    {
        name:"Catching",
        path:"/pokemon/:name/catching"
    },
    {
        name:"Capable Moves",
        path:"/pokemon/:name/moves"
    }
]