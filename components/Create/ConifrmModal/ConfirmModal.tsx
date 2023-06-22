import Button from "@/components/Button/Button";
import ModalComponent from "@/components/ModalComponent";
import React from "react";
import styles from "./ConfirmModal.module.css";
import { formatOperand } from "@/utils/helpers";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  fiatAfterCommission: string;
  currency: any;
  satsAfterCommission: string;
  accountType: string;
  commissionPercentage: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  handleSubmit,
  fiatAfterCommission,
  currency,
  satsAfterCommission,
  accountType,
  commissionPercentage,
}) => {
  return (
    <ModalComponent open={open} onClose={onClose}>
      <div className={styles.modal_container}>
        <h1 className={styles.modalTitle}>Confirm</h1>
        <div>
          <h2 className={styles.modalSubtitle}>Total Amount </h2>
          <p className={styles.modalText}>
            {formatOperand(
              Number(fiatAfterCommission).toFixed(currency.fractionDigits)
            )}{" "}
            {currency.name}
          </p>
          <p className={styles.modalText}>
            ≈ {formatOperand(satsAfterCommission)} sats
          </p>
        </div>
        <div>
          <h3 className={styles.modalSubtitle}>Sats Type</h3>
          <p className={styles.modalText}>
            {accountType === "BTC" ? "Regular" : "Stable"}
          </p>
        </div>
        <div>
          <h3 className={styles.modalSubtitle}>Commission</h3>
          <p className={styles.modalText}>{formatOperand(commissionPercentage)}%</p>
        </div>
        <div className={styles.button_container}>
          <Button onClick={handleSubmit}>Confirm</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ConfirmModal;
