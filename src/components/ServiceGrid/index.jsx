import { Skeleton } from 'antd';
import useActions from './hooks/useActions';
import { styles } from './styles';

const ServiceGrid = () => {
  const { navigateToService, services, loading } = useActions();

  const handleServiceClick = (serviceCode, serviceSelected) => {
    navigateToService(serviceCode, serviceSelected);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.serviceIconWrapper}>
            <Skeleton.Node active style={{ width: 80, height: 80 }} />
          </div>
        ))
      ) : (
        services.map((service) => (
          <div
            key={service.service_code}
            className={styles.serviceIconWrapper}
            onClick={() => handleServiceClick(service.service_code, service)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleServiceClick(service.service_code);
            }}
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className={styles.serviceIconImage}
            />
            <span className={styles.serviceName}>
              {service.service_name}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceGrid;
