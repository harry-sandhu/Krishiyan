// ImagesData.tsx
import img1 from '../../assets/Images/G.jpg';
import img2 from '../../assets/Images/2.jpg';
import img3 from '../../assets/Images/3.jpg';
import img4 from '../../assets/Images/4.jpg';
import img5 from '../../assets/Images/5.jpg';
import img6 from '../../assets/Images/6.png';
import img7 from '../../assets/Images/7.png';
import img8 from '../../assets/Images/8.png';
import img9 from '../../assets/Images/9.png';
import img10 from '../../assets/Images/10.png';
import img11 from '../../assets/Images/11.png';
import img13 from '../../assets/Images/12.png';
import img12 from '../../assets/Images/13.png';
import img14 from '../../assets/Images/14.png';
import img15 from '../../assets/Images/15.png';
import img16 from '../../assets/Images/16.png';
import img17 from '../../assets/Images/17.png';
import img18 from '../../assets/Images/18.png';
import img19 from '../../assets/Images/19.png';
import img20 from '../../assets/Images/20.png';
import img21 from '../../assets/Images/21.png';
import img22 from '../../assets/Images/22.png';
import img23 from '../../assets/Images/23.png';
import img24 from '../../assets/Images/24.png';
import img25 from '../../assets/Images/Maturity.png';

import img26 from '../../assets/Images/Stem fly.jpg';
import img27 from '../../assets/Images/Stem borer.png';
import img28 from '../../assets/Images/Pink stem borer.png';
import img29 from '../../assets/Images/Corn wormEarworm.jpg';
import img30 from '../../assets/Images/Web worm.png';
import img31 from '../../assets/Images/Ash weevil.png';
import img32 from '../../assets/Images/Leafhopper.png';
import img33 from '../../assets/Images/Aphid or Plant lice.png';
import img34 from '../../assets/Images/Ear head bug.png';
import img35 from '../../assets/Images/Fall army warm.png';



export interface ImageObject {
    crop: string;
    images: string[];
    name: any;
    pestData: {
        name: string;
        images: string[]; // Array of image URLs
    }[];

}

const ImagesData: ImageObject[] = [
    {
        crop: "Maize",
        images: [img1, img2, img3, img4, img5],
        name: ["Germination", "Vegitative Stage", "Flowering Stage", "Cob development", "Harvesting"],
        pestData: [{
            name: "pest1",
            images: [img26, img27, img28, img29, img30, img31, img32, img33, img34, img35]
        }]
    },
    {
        crop: "Paddy",
        images: [img6, img7, img8, img9, img10],
        name: ["Seedling nursery", "Tilering-Transplanted", "Panicle initiation", "Flowering", "Harvesting"],
        pestData: [{
            name: "pest1",
            images: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
        }]
    },
    {
        crop: "Groundnut",
        images: [img11, img12, img13, img14, img15],
        name: ["Seed Germination", "Flowering", "Pod Developing", "Pod filling", "Harvesting"],
        pestData: [{
            name: "pest2",
            images: [img26, img27, img28, img29, img30, img31, img32, img33, img34, img35]
        }]
    },
    {
        crop: "Wheat",
        images: [img16, img17, img18, img19, img20],
        name: ["Seed Germination", "Tillering", "Flowering", "Milking", "Harvesting"],
        pestData: [{
            name: "pest3",
            images: [img26, img27, img28, img29, img30, img31, img32, img33, img34, img35]
        }]
    },
    {
        crop: "Soyabean",
        images: [img21, img22, img23, img24, img25],
        name: ["Seed Germination", "First Trifoliation", "Beginning of bloom", "Pod filling", "Harvesting"],
        pestData: [{
            name: "pest4",
            images: [img26, img27, img28, img29, img30, img31, img32, img33, img34, img35]
        }]
    }

];

export default ImagesData;
