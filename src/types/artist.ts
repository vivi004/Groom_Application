import { ImageSourcePropType } from 'react-native';

export interface ReviewProps {
    name: string;
    time: string;
    text: string;
    image: ImageSourcePropType;
}

export interface ArtistItem {
    id: string;
    name: string;
    specialty: string;
    rating: string;
    description: string;
    image: ImageSourcePropType;
    gallery?: ImageSourcePropType[];
    reviews: ReviewProps[];
}
