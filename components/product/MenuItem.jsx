import Image from "next/image";
import Link from "next/link";
import {RiShoppingCart2Fill} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {addProduct} from "../../redux/cartSlice";

const MenuItem = ({product}) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const findCart = cart.products.find((item) => item._id === product._id);

    const addToCart = () => {
        dispatch(
            addProduct({
                ...product,
                extras: [],
                price: product.prices[0],
                quantity: 1,
                foodQuantity: 1,
            })
        );
    };

    return (
        <div className="bg-amber-500 rounded-3xl relative">
            <div
                className="w-full bg-secondary h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl cursor-pointer"
                style={{backgroundImage: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                // onClick={() => window.location.href = `/product/${product._id}`}
            >
            </div>
            <div className="p-[25px] text-white ">
                <h4 className="text-xl font-bold mb-3 ">{product.title}</h4>
                <p className="text-[15px]">{product.desc}</p>
                <div className="flex justify-between items-center mt-4">
                    <span>${product.prices[0]}</span>
                    <button
                        className="btn-primary font-bold !w-10 !h-10 !rounded-full !p-0 grid place-content-center absolute bottom-4 right-5"
                        disabled={findCart}
                        onClick={addToCart}
                    >
                        <RiShoppingCart2Fill/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;


// <div
//     className="w-full bg-secondary bg-[#f1f2f3] h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl ">
//     <Link href={`/product/${product._id}`}>
//         <div className="relative w-36 h-36 hover:scale-110 transition-all">
//             <Image
//                 src={product.img}
//                 alt=""
//                 layout="fill"
//                 className="rounded-full"
//             />
//         </div>
//     </Link>
// </div>