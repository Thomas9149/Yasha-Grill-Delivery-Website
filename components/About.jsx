import Image from "next/image";
import Title from "./ui/Title";
import {useMediaQuery} from "react-responsive";

const About = () => {
  const isIPhone = useMediaQuery({ query: "(max-width: 600px)" });

  return (
      isIPhone ? (
          <>
            <div className="bg-secondary py-14">
              <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
                <div className="flex justify-center">
                </div>
                <div className="md:w-1/2 ">
                  <div className="font-extralight text-3xl">A Taste of Tradition, Made Fresh Daily</div>
                  <p className="my-5 flex flex-col font-mono items-left">
                    At Yasha Grill Pizza & Burgers, we're passionate about bringing you delicious food made with the
                    freshest
                    ingredients. We believe taste starts with quality, and that's why we take pride in using:
                  </p>
                  <div className="font-mono">
                    <ul>
                      <span className="font-bold">Homemade dough:</span> Our pizzas and some pastas are crafted with
                      fresh, hand-kneaded dough made daily on-site. You can truly taste the difference in every bite.
                      <br/><br/>
                      <div className="relative sm:w-[445px] sm:h-[560px]  flex justify-center w-[300px] h-[350px]">
                        <Image src="/images/about-img.png" alt="" layout="fill"/>
                      </div>
                      <br/>
                      <span className="font-bold">High-quality ingredients:</span>We source fresh vegetables, flavorful
                      meats, and authentic spices to create dishes that burst with flavor.
                      <br/><br/>
                      <span className="font-bold">Traditional recipes:</span>We combine time-tested recipes with a touch
                      of culinary creativity to deliver a unique and satisfying dining experience.
                      <br/><br/>
                    </ul>

                  </div>
                  <button className="btn-primary"><a href="/menu">MENU</a></button>
                </div>
              </div>
            </div>
          </>
      ) : (
          <>
          <div className="bg-secondary py-14">
              <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
                <div className="flex justify-center">
                  <div className="relative sm:w-[445px] sm:h-[560px]  flex justify-center w-[300px] h-[350px]">
                    <Image src="/images/about-img.png" alt="" layout="fill"/>
                  </div>
                </div>
                <div className="md:w-1/2 ">
                  <div className="font-extralight text-3xl">A Taste of Tradition, Made Fresh Daily</div>
                  <p className="my-5 flex flex-col font-mono items-left">
                    At Yasha Grill Pizza & Burgers, we're passionate about bringing you delicious food made with the
                    freshest
                    ingredients. We believe taste starts with quality, and that's why we take pride in using:
                  </p>
                  <div className="font-mono">
                    <ul>
                      <span className="font-bold">Homemade dough:</span> Our pizzas and some pastas are crafted with
                      fresh, hand-kneaded dough made daily on-site. You can truly taste the difference in every bite.
                      <br/><br/>
                      <span className="font-bold">High-quality ingredients:</span>We source fresh vegetables, flavorful
                      meats, and authentic spices to create dishes that burst with flavor.
                      <br/><br/>
                      <span className="font-bold">Traditional recipes:</span>We combine time-tested recipes with a touch
                      of culinary creativity to deliver a unique and satisfying dining experience.
                      <br/><br/>
                    </ul>

                  </div>
                  <button className="btn-primary"><a href="/menu">MENU</a></button>
                </div>
              </div>
            </div>
          </>
      )
  );
};

export default About;


// <div className="bg-secondary py-14">
//   <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
//     <div className="flex justify-center">
//       <div className="relative sm:w-[445px] sm:h-[560px]  flex justify-center w-[300px] h-[350px]">
//         {/*<Image src="/images/about-img.png" alt="" layout="fill" />*/}
//       </div>
//     </div>
//     <div className="md:w-1/2 ">
//       <Title addClass="text-[40px]">A Taste of Tradition, Made Fresh Daily</Title>
//       <p className="my-5 flex flex-col font-mono items-left">
//         At Yasha Grill Pizza & Burgers, we're passionate about bringing you delicious food made with the freshest
//         ingredients. We believe taste starts with quality, and that's why we take pride in using:
//       </p>
//       <div>
//         <ul>
//           <li>Homemade dough: Our pizzas and some pastas are crafted with fresh, hand-kneaded dough made daily
//             on-site. You can truly taste the difference in every bite.
//           </li>
//           <li>High-quality ingredients: We source fresh vegetables, flavorful meats, and authentic spices to create
//             dishes that burst with flavor.
//           </li>
//           <li>Traditional recipes: We combine time-tested recipes with a touch of culinary creativity to deliver a
//             unique and satisfying dining experience.
//           </li>
//         </ul>
//       </div>
//       <button className="btn-primary">Read More</button>
//     </div>
//   </div>
// </div>