import { ArtistItem, ReviewProps } from '@/types/artist';

// Dummy common reviews for artists that don't have specific ones yet
const commonReviews: ReviewProps[] = [
    {
        name: "Fatima Siddiqui",
        time: "2 Mins",
        text: "Fatima is renowned for her expertise in Muslim bridal looks, blending elegance with tradition.",
        image: require('../../assets/artists/fatima.jpg')
    },
    {
        name: "Aarav Malhotra",
        time: "5 Mins",
        text: "Aarav transforms every groom with precision—whether it's a traditional sherwani look or a modern tuxedo vibe.",
        image: require('../../assets/artists/aarav.jpg')
    },
    {
        name: "Priya Sharma",
        time: "10 Mins",
        text: "The finish was flawless! Definitely the best in the business for glam.",
        image: require('../../assets/stylist_img/neha_sharma.png') // fallback
    },
    {
        name: "Neha Varma",
        time: "1 Hour",
        text: "Very professional and punctual. She understood exactly what I wanted.",
        image: require('../../assets/artists/riya.jpg')
    }
];

export const ARTISTS: ArtistItem[] = [
    {
        id: 'isha',
        name: 'Isha Mehra',
        specialty: 'Bridal Makeup',
        description: 'Isha Mehra is an incredible bridal makeup artist focused on bringing out natural beauty.',
        rating: '4.5',
        image: require('../../assets/artists/isha.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img7.png')
        ],
        reviews: commonReviews
    },
    {
        id: 'kabir',
        name: 'Kabir Styles',
        specialty: 'Groom Hair',
        description: 'Kabir specializes in dapper grooming styles to ensure the groom looks as sharp as the bride.',
        rating: '4.7',
        image: require('../../assets/artists/kabir.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img7.png'),
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png')
          
        ],
        reviews: commonReviews
    },
    {
        id: 'riya',
        name: 'Riya',
        specialty: 'Mehndi',
        description: 'Riya is a master Mehndi artist bringing intricate and breathtaking designs to life.',
        rating: '4.9',
        image: require('../../assets/artists/riya.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img7.png'),
            require('../../assets/artists/sanya_gal/img6.png')
        ],
        reviews: commonReviews
    },
    {
        id: 'afreen',
        name: 'Afreen Khan',
        specialty: 'Muslim Bridal',
        description: 'Afreen Khan is distinguished for producing stunning traditional Muslim bridal looks.',
        rating: '4.6',
        image: require('../../assets/artists/afreen.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img7.png'),
             require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img1.jpg')
        ],
        reviews: commonReviews
    },
    {
        id: 'rajveer',
        name: 'Rajveer Singh',
        specialty: 'Beard Sculpting',
        description: 'Rajveer masters the art of sharp, clean beard fades and sculpting that complete a polished look.',
        rating: '4.5',
        image: require('../../assets/artists/rajveer.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img7.png'),
            require('../../assets/artists/sanya_gal/img1.jpg')
          
        ],
        reviews: commonReviews
    },
    {
        id: 'diya',
        name: 'Diya Ghosh',
        specialty: 'Christian Bridal',
        description: 'Diya brings a serene and flawless elegance to Christian brides focusing on subtle definition.',
        rating: '4.7',
        image: require('../../assets/artists/diya.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img7.png')
        ],
        reviews: commonReviews
    },
    {
        id: 'sanya',
        name: 'Sanya Kapoor',
        specialty: 'Bridal Airbrush',
        description: 'Sanya is a certified bridal artist known for creating soft, glowing wedding looks using high-definition airbrush techniques. She ensures a picture-perfect finish that lasts all day.',
        rating: '4.4',
        image: require('../../assets/artists/sanya.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img7.png')
        ],
        reviews: commonReviews
    },
    {
        id: 'aarav',
        name: 'Aarav',
        specialty: 'Groom Styling',
        description: 'Aarav transforms every groom with precision—whether it\'s a traditional sherwani look or a modern tuxedo vibe.',
        rating: '4.5',
        image: require('../../assets/artists/aarav.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png'),
            require('../../assets/artists/sanya_gal/img7.png')
        ],
        reviews: commonReviews
    },
    {
        id: 'fatima',
        name: 'Fatima',
        specialty: 'Muslim Bridal',
        description: 'Fatima is renowned for her expertise in Muslim bridal looks, blending elegance with tradition.',
        rating: '4.9',
        image: require('../../assets/artists/fatima.jpg'),
        gallery: [
            require('../../assets/artists/sanya_gal/img3.jpg'),
            require('../../assets/artists/sanya_gal/img4.png'),
            require('../../assets/artists/sanya_gal/img5.png'),
            require('../../assets/artists/sanya_gal/img6.png'),
            require('../../assets/artists/sanya_gal/img7.png'),
            require('../../assets/artists/sanya_gal/img1.jpg'),
            require('../../assets/artists/sanya_gal/img2.png')
        ],
        reviews: commonReviews
    },
];
