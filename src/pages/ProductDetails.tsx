import { Eye, Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { products as productsData, type Product } from '../lib/data';
import { useAuth } from '../context/AuthContext';

export const ProductDetails = () => {
	const { isAuthenticated } = useAuth();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const { toggleFavorite, isFavorite } = useFavorites();
	const { addToCart, isInCart } = useCart();
	const { addToast } = useToast();

	const [activeImage, setActiveImage] = useState<string>('');

	useEffect(() => {
		const initialProduct = productsData.find(p => p.id === id);
		if (initialProduct) {
			setProduct(initialProduct);
			setActiveImage(initialProduct.image);
			const related = productsData
				.filter(p => p.category?.toLowerCase() === initialProduct.category?.toLowerCase() && p.id !== initialProduct.id)
				.slice(0, 8);
			setRelatedProducts(related);
			setLoading(false);
		} else {
			setLoading(true);
		}

		const fetchProduct = async () => {
			if (!id) return;
			const data = productsData.filter(p => p.id === id)[0];
			if (data) {
				setProduct(data);
				setActiveImage(data.image);
				const related = productsData
					.filter(p => p.category?.toLowerCase() === data.category?.toLowerCase() && p.id !== data.id)
					.slice(0, 8);
				setRelatedProducts(related);
			}
			setLoading(false);
		};
		fetchProduct();
		window.scrollTo(0, 0);
	}, [id]);

	const handleToggleFavorite = (p: Product) => {
		if (!isAuthenticated) {
			addToast('You have to login to favorite products');
			return;
		}
		const wasFavorite = isFavorite(p.id);
		toggleFavorite(p);
		if (!wasFavorite) {
			addToast('Added to favorites');
			navigate('/favorites');
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="grow flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1443C3]"></div>
				</div>
				<Footer />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="grow flex flex-col items-center justify-center gap-4">
					<h2 className="text-2xl font-bold">Product not found</h2>
					<Link to="/" className="text-[#1443C3] hover:underline">Back to Home</Link>
				</div>
				<Footer />
			</div>
		);
	}
	const productImages = product.thumbnails?.length > 0
		? product.thumbnails
		: [product.image];

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />

			<main className="grow py-12">
				<div className="container mx-auto px-4 max-w-7xl">
					{/* Breadcrumbs */}
					<nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
						<Link to="/" className="hover:text-black">Account</Link>
						<span>/</span>
						<span className="capitalize">{product.category}</span>
						<span>/</span>
						<span className="text-black font-medium">{product.name}</span>
					</nav>

					<div className="flex flex-col lg:flex-row gap-12 mb-20">
						{/* Left: Thumbnails */}
						<div className="flex lg:flex-col gap-4 order-2 lg:order-1">
							{productImages.map((img, idx) => (
								<div
									key={idx}
									onClick={() => setActiveImage(img)}
									className={`w-24 h-24 sm:w-32 sm:h-32 bg-[#F5F5F5] rounded-sm p-4 flex items-center justify-center cursor-pointer transition-all border-2 ${activeImage === img ? 'border-[#1443C3]' : 'border-transparent'}`}
								>
									<img src={img} alt={`${product.name} ${idx}`} className="max-h-full max-w-full object-contain mix-blend-multiply" />
								</div>
							))}
						</div>

						{/* Center: Main Image */}
						<div className="flex-1 grow bg-[#F5F5F5] rounded-sm p-8 flex items-center justify-center max-h-100 lg:h-150 order-1 lg:order-2">
							<motion.img
								key={activeImage}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								src={activeImage}
								alt={product.name}
								className="max-h-full max-w-full object-contain mix-blend-multiply"
							/>
						</div>

						{/* Right: Product Info */}
						<div className="flex-1 lg:w-100 flex flex-col order-3">
							<h1 className="text-2xl font-bold text-red-500 mb-4">{product.name}</h1>


							<div className="text-2xl font-medium text-black mb-6">${product.price.toFixed(2)}</div>

							<p className="text-lg text-indigo-700 mb-8 leading-relaxed">
								{product.description}
							</p>

							<div className="h-px bg-gray-300 mb-8"></div>

							<div className="flex items-center gap-4 mb-8">
								<button
									onClick={() => {
										if (!isInCart(product.id)) {
											addToCart(product);
										}
										navigate('/cart');
									}}
									className="flex-grow bg-[#1443C3] text-white h-11 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
								>
									Buy Now
								</button>
								<button
									onClick={() => handleToggleFavorite(product)}
									className={`w-11 h-11 rounded-md border flex items-center justify-center transition-all shrink-0 ${isFavorite(product.id)
										? 'bg-red-500 border-red-500 text-white'
										: 'border-gray-300 text-black hover:border-red-500 hover:text-red-500'
										}`}
								>
									<Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
								</button>
							</div>

							{/* Features */}
							<div className="border border-gray-400 rounded-md overflow-hidden">
								<div className="p-6 flex items-center gap-4 border-b border-gray-400">
									<div className="w-10 h-10 flex items-center justify-center">
										<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M11.6667 31.6667C13.5076 31.6667 15 30.1743 15 28.3333C15 26.4924 13.5076 25 11.6667 25C9.82572 25 8.33334 26.4924 8.33334 28.3333C8.33334 30.1743 9.82572 31.6667 11.6667 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M8.33334 28.3333H6.66667V8.33334H23.3333V28.3333H25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M23.3333 13.3333H30L35 20V28.3333H31.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M30 20H23.3333V13.3333" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<div>
										<div className="font-medium text-base text-black">Free Delivery</div>
										<div className="text-xs text-black underline cursor-pointer">Enter your postal code for Delivery Availability</div>
									</div>
								</div>
								<div className="p-6 flex items-center gap-4">
									<div className="w-10 h-10 flex items-center justify-center">
										<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M33.3333 20C33.3333 27.3638 27.3638 33.3333 20 33.3333C12.6362 33.3333 6.66666 27.3638 6.66666 20C6.66666 12.6362 12.6362 6.66667 20 6.66667V11.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M15 11.6667L20 6.66667L15 1.66667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<div>
										<div className="font-medium text-base text-black">Return Delivery</div>
										<div className="text-xs text-black">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Related Products Section */}
					<div className="mt-20">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-5 h-10 bg-[#1443C3] rounded-sm"></div>
							<span className="text-[#1443C3] font-bold">Related Item</span>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							{relatedProducts.map((p) => (
								<motion.div
									key={p.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
									onClick={() => navigate(`/products/${p.id}`)}
								>
									<div className="relative bg-gray-50 rounded-xl p-6 mb-4 h-[240px] flex items-center justify-center overflow-hidden">
										<div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleToggleFavorite(p);
												}}
												className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${isFavorite(p.id)
													? 'bg-red-500 text-white'
													: 'bg-white text-black hover:bg-red-500 hover:text-white'
													}`}
											>
												<Heart className={`w-4 h-4 ${isFavorite(p.id) ? 'fill-current' : ''}`} />
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/products/${p.id}`);
												}}
												className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-red-500 hover:text-white transition-all shadow-sm"
											>
												<Eye className="w-4 h-4" />
											</button>
										</div>
										<img
											src={p.image}
											alt={p.name}
											className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
										/>
									</div>

									<div className="space-y-3">
										<div className="text-xs text-gray-500 uppercase font-bold">{p.category}</div>
										<h3 className="font-bold text-gray-900 line-clamp-2 h-12 leading-tight group-hover:text-[#1443C3] transition-colors">
											{p.name}
										</h3>
										<div className="flex items-center justify-between pt-2">
											<span className="text-xl font-bold text-[#1443C3]">${p.price.toFixed(2)}</span>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};
