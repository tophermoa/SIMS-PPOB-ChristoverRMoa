import { styles } from './styles';

const Modal = ({
  isOpen,
  icon,
  iconBgColor,
  title,
  amount,
  description,
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        {/* Icon */}
        <div className={styles.iconCircle(iconBgColor)}>
          <div className={styles.icon}>{icon}</div>
        </div>

        {/* Text Content */}
        {title && <p className={styles.title}>{title}</p>}
        {amount && <h2 className={styles.amount}>{amount}</h2>}
        {description && <p className={styles.description}>{description}</p>}

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button
            onClick={onPrimaryClick}
            className={styles.primaryButton}
          >
            {primaryButtonText}
          </button>

          {secondaryButtonText && onSecondaryClick && (
            <button
              onClick={onSecondaryClick}
              className={styles.secondaryButton}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
