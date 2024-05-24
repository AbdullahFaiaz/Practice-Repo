import one from '../assets/banner1.jpg'
import two from '../assets/banner2 (2).jpg'
import three from '../assets/three.jpg'
import four from '../assets/four.jpg'
import five from '../assets/five.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter'




const BannerSlider = () => {
  return (
    <div className='relative'>
   <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-top' src={one} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-center' src={two} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-bottom' src={three} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-center' src={four} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-bottom' src={five} alt="image" /></SwiperSlide>
      </Swiper>
      <div className='text-[8vw] md:text-[4.5vw] text-[#b32a2a] absolute bottom-[42%] md:bottom-[55%] right-[21%] md:right-[36%] z-10 font-semibold drop-shadow-2xl rounded-sm'><p className=''>
      <Typewriter
words={['Metro Attire']}
loop={50}
typeSpeed={100}
deleteSpeed={60}
delaySpeed={2000}
/>
        </p></div>
</div>
  );
};

export default BannerSlider;
