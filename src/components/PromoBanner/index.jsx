import { Skeleton } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import useActions from './hooks/useActions';
import { styles } from './styles';

const PromoBanner = () => {
  const { banners, loading } = useActions();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Temukan promo menarik
      </h2>

      <Swiper
        freeMode={true}
        modules={[FreeMode]}
        spaceBetween={20}
        slidesPerView="auto"
        resistanceRatio={0}
        className={styles.swiperContainer}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <Skeleton.Node active style={{ width: 260, height: 120, borderRadius: 12 }} />
            </SwiperSlide>
          ))
        ) : (
          banners.map((banner, index) => (
            <SwiperSlide key={banner.banner_name || index} style={{ width: 'auto' }}>
              <div className={styles.promoCard}>
                <img
                  src={banner.banner_image}
                  alt={banner.banner_name}
                  className={styles.promoImage}
                />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default PromoBanner;
