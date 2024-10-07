import Image from "next/image";
import Title from "./ui/Title";
import { Carousel } from "flowbite-react";
import {useMediaQuery} from "react-responsive";

const MyCarousel = () => {
    const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

    return (
        isIPhone ? (
            <>
                {/*/!*TODO*!/*/}
                {/*/!*<div className="bg-amber-500 text-primary py-30">*!/*/}
                {/*<div className="bg-red-700 text-primary py-30">*/}
                {/*/!*<p>Hello mobile</p>*!/*/}
                {/*    <p></p>*/}
                {/*</div>*/}
                {/*<br/><br/><br/><br/><br/><br/><br/><br/>*/}

            </>

        ) : (
            <>
                <div className="bg-amber-500 text-primary py-30">
                    <div className="container mx-auto flex items-center justify-center">
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96" style={{width: '900px', marginLeft: '110px'}}>
                            <Carousel slideInterval={15000}>{/*10seconds*/}
                                <Image src="/two.jpg" alt="Burger" layout="fill"
                                       objectFit="cover"/>
                                <Image src="/one.jpg" alt="Burger" layout="fill"
                                       objectFit="cover"/>
                                <Image src="/pastaGreen.jpg" alt="Burger" layout="fill"
                                       objectFit="cover"/>
                                {/*<Image src="/yasha-main-picture.jpg" alt="Yasha Grill" layout="fill"*/}
                                {/*       objectFit="cover"/>*/}
                            </Carousel>
                        </div>
                    </div>
                </div>

                {/*<div className="bg-amber-500 text-primary py-30">*/}
                {/*    <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">*/}
                {/*        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">*/}
                {/*            <Carousel slideInterval={5000}>*/}
                {/*                <Image src="/grill-pictures/pepperoni.png" alt="Burger" layout="fill" objectFit="cover"/>*/}
                {/*                <Image src="/grill-pictures/pepperoni.png" alt="Burger" layout="fill" objectFit="cover"/>*/}
                {/*                <Image src="/grill-pictures/kebab_platter.jpg" alt="Burger" layout="fill" objectFit="cover"/>*/}
                {/*                <Image src="/hamburgerOne.jpg" alt="Burger" width={500} height={300}/>*/}
                {/*            </Carousel>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        )

    );
};

export default MyCarousel;
